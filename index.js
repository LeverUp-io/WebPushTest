const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BJBR51nLIP25i2-eAYA-bOuW7W3QZs0B2LUkHfWG6UpDXKlApkCY6UB645FtYNHQR-TccpwTSHFH3hEQexcai5I";
const privateVapidKey = "DUcAvEaNOr8VJWbWVkmzG3xJyR72Tynf9iiMNAfpxv8";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));
