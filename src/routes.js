const express = require("express");
const router = express.Router();

const userRoute = require("../user/user.route");
const playlistRoute = require("../playlist/playlist.route");
const videoRoute = require("../video/video.route");
const annonceUploadRoute = require("../annoncesUpload/annoncesUpload.route");
const historyRoute = require("../history/history.route");

router.use("/user", userRoute);
router.use("/playlist", playlistRoute);
router.use("/video", videoRoute);
router.use("/annoncesUpload", annonceUploadRoute);
router.use("/history", historyRoute);

module.exports = router;