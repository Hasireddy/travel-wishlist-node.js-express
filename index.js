const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const countriesRouter = require("./routes/countriesRouter");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => res.send('Travel Wishlist API'));

app.use("/api/countries", countriesRouter);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));