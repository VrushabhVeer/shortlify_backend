const express = require("express");
const urlRoute = express.Router();
const mongoose = require("mongoose");
const { URL_model } = require("../models/urlModel");

urlRoute.post("/add", async (req, res) => {
  const { originalURL } = req.body;
  try {
    if (!originalURL) return res.json({ msg: "Please Provide URL" });

    const newURL = new URL_model({ originalURL });
    await newURL.save();
    res.status(200).send(newURL);
  } catch (error) {
    console.log(error);
    res.status(502).send({ msg: "Bad Gateway", err: error });
  }
});

urlRoute.get("/all", async (req, res) => {
  try {
    const allurl = await URL_model.find({});
    res.status(200).json(allurl);
  } catch (error) {
    console.log(error);
    res.status(502).send({ msg: "Bad Gateway", err: error });
  }
});

urlRoute.delete("/:id", async (req, res) => {
  try {
    const allurl = await URL_model.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: "URL Deleted" });
  } catch (error) {
    console.log(error);
    res.status(502).send({ msg: "Bad Gateway", err: error });
  }
});

module.exports = { urlRoute };
