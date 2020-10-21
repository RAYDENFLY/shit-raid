const { Router } = require("express");
const router = Router();

const Raid = require("../tools");

router.get("/", async (req, res) => {
  const token = req.query.token;
  const server_id = req.query.guildID;
  const act = req.query.act;
  
  await Raid.doit(res, token, server_id, act);
});

module.exports = router;