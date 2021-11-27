const express = require("express");
const router = express.Router();
const bo = require("./user.bo");

router.post("/getById", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.getById(request);
    res.send(result);
});

router.post("/getByEmail", async function(req, res) {
    const request = {
        email: req.body.email,
    };
    const result = await bo.getByEmail(request);
    res.send(result);
});

router.post("/authenticate", async function(req, res) {
    const request = {
        email: req.body.email,
        password: req.body.password,
    };
    const result = await bo.authenticate(request);
    res.send(result);
});

router.post("/createAccount", async function(req, res) {
    const request = {
        email: req.body.email,
        password: req.body.password,
    };
    const result = await bo.create(request);
    res.send(result);
});

router.post("/modifyAccount", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.modify(request);
    res.send(result);
});

router.post("/deleteAccount", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.delete(request);
    res.send(result);
});

module.exports = router;