const express = require("express");
const router = express.Router();
const bo = require("./history.bo");

router.post("/createLog", async function(req, res) {
    const request = {
        id_video: req.body.id_video,
        id_user: req.body.id_user,
    };
    const result = await bo.create(request);
    res.send(result);
});

router.post("/getByUserId", async function(req, res) {
    const request = {
        id_user: req.body.id_user,
    };
    const result = await bo.getByUserId(request);
    res.send(result);
});

router.post("/getAllLog", async function(req, res) {
    const result = await bo.getAll();
    res.send(result);
});

router.post("/getById", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.getById(request);
    res.send(result);
});

module.exports = router;