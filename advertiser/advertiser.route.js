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

router.post("/getByAnnonceur", async function(req, res) {
    const request = {
        _idAdvertiser: req.body._id,
    };
    const result = await bo.getByUserID(request);
    res.send(result);
});

router.post("/createAdvert", async function(req, res) {
    const request = {
        id_user: req.body.id_user,
        fileName: req.body.fileName,
    };
    const result = await bo.create(request);
    res.send(result);
});

router.post("/modifyAdvert", async function(req, res) {
    const request = {
        _id: req.body._id,
        ...req.body,
    };
    const result = await bo.modify(request);
    res.send(result);
});

router.post("/deleteAdvert", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.delete(request);
    res.send(result);
});

router.post("/getRandom", async function(req, res) {
    const result = await bo.getRandom();
    res.send(result);
});

module.exports = router;