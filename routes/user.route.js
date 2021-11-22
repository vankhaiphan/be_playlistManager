const express = require("express");
const router = express.Router();
const dao = require("../models/user.dao");

router.post("/getById", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.getById(request);
    res.send(result);
});

module.exports = router;