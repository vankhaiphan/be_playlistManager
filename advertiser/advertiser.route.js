const express = require("express");
const router = express.Router();
const bo = require("./advertiser.bo");

router.post("/getSet", async function(req, res) {
    const result = await bo.getSet();
    res.send(result);
});

router.post("/getById", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.getById(request);
    res.send(result);
});