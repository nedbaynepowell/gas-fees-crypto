import * as dotenv from "dotenv";
import * as functions from "firebase-functions";
import * as cors from "cors";
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as express from "express";
import * as bodyParser from "body-parser";

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
  const { email, threshold } = req.body as {
    email: string;
    threshold: string;
  };

  const notification = await db.collection("notification-list").add({
    email,
    threshold,
  });

  res.json(notification);
});

export const webApi = functions.https.onRequest(main);
