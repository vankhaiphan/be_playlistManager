const express = require("express");
const router = express.Router();
const bo = require("./history.bo");

router.post("/createLog", async function(req, res) {
    const request = {
        videoId: req.body.videoId,
        videoUrl: req.body.videoUrl,
        title: req.body.title,
        channelId: req.body.channelId,
        channelUrl: req.body.channelUrl,
        channelTitle: req.body.channelTitle,
        description: req.body.description,
        publishedAt: req.body.publishedAt,
        thumbnail: req.body.thumbnail,
        playlists: req.body.playlists,
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

router.post("/deleteByIdUser", async function(req, res) {
    const request = {
        id_user: req.body.id_user,
    };
    const result = await bo.deleteByIdUser(request);
    res.send(result);
});
module.exports = router;