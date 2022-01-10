const express = require("express");
const router = express.Router();
const bo = require("./video.bo");

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

module.exports = router;