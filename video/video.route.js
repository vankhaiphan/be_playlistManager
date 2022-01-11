const express = require("express");
const router = express.Router();
const bo = require("./video.bo");
const dotenv = require("dotenv");
dotenv.config();

router.post("/getByPlaylistId", async function(req, res) {
    const request = {
        id_playlist: req.body.id_playlist,
    };
    const result = await bo.getByPlaylistId(request);
    res.send(result);
});

// router.post("/createVideo", async function(req, res) {
//     const request = {
//         name: req.body.name,
//         password: req.body.password,
//         ads: req.body.ads,
//     };
//     const result = await bo.create(request);
//     res.send(result);
// });

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