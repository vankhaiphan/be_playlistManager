const express = require("express");
const router = express.Router();
const bo = require("./playlist.bo");

router.post("/getByUserId", async function(req, res) {
    const request = {
        id_user: req.body.id_user,
    };
    const result = await bo.getByUserId(request);
    res.send(result);
});

router.post("/getById", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.getById(request);
    res.send(result);
});

router.post("/createPlaylist", async function(req, res) {
    const request = {
        name: req.body.name,
        id_user: req.body.id_user,
        description: req.body.description,
        status: req.body.status,
    };
    const result = await bo.create(request);
    res.send(result);
});

router.post("/modifyPlaylist", async function(req, res) {
    const request = {
        _id: req.body._id,
        ...req.body,
    };
    const result = await bo.modify(request);
    res.send(result);
});

router.post("/deletePlaylist", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.delete(request);
    res.send(result);
});

router.post("/getVideos", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.getVideos(request);
    res.send(result);
});

router.post("/addVideo", async function(req, res) {
    const request = {
        _id: req.body._id,
        video: req.body.video,
        thumbnail: req.body.thumbnail,
    };
    const result = await bo.addVideo(request);
    res.send(result);
});

router.post("/updateThumbnail", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.updateThumbnail(request);
    res.send(result);
});

module.exports = router;