import * as dotenv from "dotenv";
import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as moment from "moment";
import * as sendGridClient from "@sendgrid/mail";
import * as cors from "cors";
import { parse } from "node-html-parser";
import axios from "axios";
import { getStorage } from "firebase-admin/storage";

sendGridClient.setApiKey(functions.config().sendgrid.secret_key);

const app = express();
app.use(express.static("public"));
app.use(cors());

const main = express();

//add the path to receive request and set json as bodyParser to process the body
main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// initialize configuration
dotenv.config();

// Initialize Firebase Firestore
initializeApp({
  storageBucket: "gas-fees-crypto.appspot.com",
});

const db = getFirestore();

app.get("/ethereumEcosystem", async (_req, res) => {
  const bucket = getStorage().bucket("gas-fees-crypto.appspot.com");
  const file = bucket.file("cryptocurrencies.json");
  const data = await file.download();
  const json = JSON.parse(data.toString());
  res.send(json);
});

app.get("/fetchCurrency", async (_req, res) => {
  const notification = await db.collection("currency").doc("latest").get();
  console.log("notification.data()", notification.data());
  const currencyData = notification.data();

  res.json(currencyData);
});

app.post("/addUserToNotifications", async (req, res) => {
  try {
    const { email, threshold } = JSON.parse(req.body) as {
      email: string;
      threshold: string;
    };

    const notification = await db.collection("notification-list").add({
      email,
      threshold,
      created_at: new Date(),
      last_nofitication_sent: 0,
    });

    res.json(notification);
  } catch (error) {
    console.log("addUserToNotifications error", error);
    res.json("/addUserToNotifications error");
  }
});

app.get("/historicalData", async (req, res) => {
  try {
    const response = (await axios.get(
      "https://livdir.com/ethgaspricechart/log/all.json"
    )) as any;

    res.json(response.data);
  } catch (error) {
    console.log("historical data error", error);
    res.json("/historicalData error");
  }
});
app.get("/news", async (req, res) => {
  try {
    const publicApiKey = "2250e5a63f76438c8a5e178e63f26ae0";
    const dateRange = moment().subtract(2, "week").format("YYYY-MM-DD");
    const response = (await axios.get(
      `https://newsapi.org/v2/everything?q=crypto&from=${dateRange}&sortBy=publishedAt&apiKey=${publicApiKey}`
    )) as any;

    res.json(response.data.articles);
  } catch (error) {
    console.log("news error", error);
    res.json("/news error");
  }
});

export const webApi = functions.https.onRequest(main);

exports.scheduledFunctionGas = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async (_context) => {
    const list = await db
      .collection("notification-list")
      .where("last_nofitication_sent", "<", Date.now() - 1000 * 60 * 60)
      .get();
    const response = (await axios.get(
      "https://ethgasstation.info/json/ethgasAPI.json"
    )) as any;
    const average = parseInt(response.data.average) / 10;

    list.docs.forEach(async (doc) => {
      const { email, threshold } = doc.data();
      // can send email if its been one day since last notification
      // email if average gas price is less than threshold
      if (average < threshold) {
        const msg = {
          to: email, // Change to your recipient
          from: "info@gasfeescrypto.com", // Change to your verified sender
          subject: "Gas Fees Alert - Low Gas Price",
          text:
            "The current average gas price is " +
            average +
            " Gwei. Please consider buying more gas.",
        };
        await sendGridClient
          .send(msg)
          .then(async () => {
            console.log("Email sent");
            await db.collection("notification-list").doc(doc.id).update({
              last_nofitication_sent: new Date(),
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
    return null;
  });
exports.scheduledFunctionCurrency = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (_context) => {
    try {
      const { data } = await axios
        .get(
          "https://api.currencyapi.com/v2/latest?apikey=a36f3760-9424-11ec-8c67-ddb97e380620"
        )
        .then((r) => r.data);
      await db.collection("currency").doc("latest").update(data);
      return "success";
    } catch (e) {
      console.log("scheduledFunctionCurrency error", e);
      return false;
    }
  });

exports.scheduledFunctionEth = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (_context) => {
    const html = await axios
      .get("https://coinmarketcap.com/view/ethereum-ecosystem/")
      .then((r) => r.data);

    const root = parse(html);

    const script = JSON.parse(root.getElementById("__NEXT_DATA__").text);
    const cleaned =
      script.props.initialState.cryptocurrency.listingLatest.data.map(
        (item: any) => ({
          name: item.name,
          symbol: item.symbol,
          price: item.quote.USD.price,
          percentChange24h: item.quote.USD.percentChange24h,
          percentChange7d: item.quote.USD.percentChange7d,
          marketCap: item.quote.USD.marketCap,
          volume: item.quote.USD.volume24h,
          circulatingSupply: item.circulatingSupply,
        })
      );

    const bucket = getStorage().bucket("gas-fees-crypto.appspot.com");
    const file = bucket.file("cryptocurrencies.json");
    file.save(JSON.stringify(cleaned));
  });
