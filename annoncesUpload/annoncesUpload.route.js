const express = require("express");
const uploadFile = require("./upload");
const router = express.Router();

router.post("/uploadAdvert", async function(req, res) {
    try {
        await uploadFile(req, res);
    
        if (req.file == undefined) {
          return res.status(400).send({ message: "Please upload a file!" });
        }
    
        res.status(200).send({
          AdFileName: req.file.originalname
        });
      } catch (err) {
        res.status(500).send({
          message: `Could not upload the file: ${err}`
        });
      }
});

module.exports = router;