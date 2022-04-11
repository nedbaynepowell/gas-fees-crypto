import * as dotenv from "dotenv";
import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as moment from "moment";
import * as sendGridClient from "@sendgrid/mail";
import * as cors from "cors";
import axios from "axios";

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
initializeApp();

const db = getFirestore();

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

exports.scheduledFunction = functions.pubsub
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
      console.log(
        JSON.stringify({
          email,
          threshold,
          average,
        })
      );
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
