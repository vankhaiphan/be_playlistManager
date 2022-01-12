const express = require("express");
const router = express.Router();
const bo = require("./video.bo");
const dotenv = require("dotenv");
dotenv.config();

router.post("/getAllByPlaylistId", async function(req, res) {
    const request = {
        id_playlist: req.body.id_playlist,
    };
    const result = await bo.getAllByPlaylistId(request);
    res.send(result);
});

router.post("/saveVideo", async function(req, res) {
    const request = {
        videoUrl: req.body.videoUrl,
        title: req.body.title,
        channelId: req.body.channelId,
        channelUrl: req.body.channelUrl,
        channelTitle: req.body.channelTitle,
        description: req.body.description,
        publishedAt: req.body.publishedAt,
        thumbnail: req.body.thumbnail,
        playlists: req.body.playlists,
    };
    const result = await bo.save(request);
    res.send(result);
});

router.post("/modifyVideo", async function(req, res) {
    const request = {
        _id: req.body._id,
    };
    const result = await bo.modify(request);
    res.send(result);
});

// router.post("/deleteVideo", async function(req, res) {
//     const request = {
//         _id: req.body._id,
//     };
//     const result = await bo.delete(request);
//     res.send(result);
// });

// router.post("/search", async function(req, res) {
//     try {
//         const searchRequest = {
//             key: process.env.YOUTUBE_API_KEY,
//         };
//         const searchResponse = await bo.search(searchRequest);
//         res.send(searchResponse);
//     } catch (error) {
//         next(error);
//     }
// });
module.exports = router;