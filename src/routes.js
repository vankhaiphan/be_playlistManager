const express = require("express");
const router = express.Router();

const userRoute = require("../user/user.route");
const playlistRoute = require("../playlist/playlist.route");
const videoRoute = require("../video/video.route");

router.use("/user", userRoute);
router.use("/playlist", playlistRoute);
router.use("/video", videoRoute);

module.exports = router;