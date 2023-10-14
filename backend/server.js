const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS Candidate (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dob TEXT, address TEXT, contact TEXT, gender TEXT)"
  );
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/storeCandidateData", (req, res) => {
  const { name, dob, address, contact, gender } = req.body;

  const query = `INSERT INTO Candidate (name, dob, address, contact, gender) VALUES (?, ?, ?, ?, ?)`;
  const values = [name, dob, address, contact, gender];

  db.run(query, values, function (err) {
    if (err) {
      console.error("Error saving candidate data:", err.message);
      res.status(500).send("Error occurred while saving candidate data");
    } else {
      res.status(200).send("Candidate data saved successfully");
    }
  });
});

const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
