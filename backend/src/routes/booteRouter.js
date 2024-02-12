// booteRouter mit allen Endpunkte (POST / PATCH / DELETE) + integrierten Controllern
import express from "express";
import { BooteService } from "../services/index.js";
// import { doBasicAuth } from "../middleware/doBasicAuth.js";
import { doJwtAuth } from "../middleware/doJwtAuth.js";

const bootRouter = express.Router();

bootRouter.get("/", async function getAllBooteCtrl(_, res) {
  try {
    const result = await BooteService.getAllBoote();
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not retrieve boote",
    });
  }
});

bootRouter.post("/", doJwtAuth, async function postNewBootCtrl(req, res) {
  try {
    const bootInfo = req.body;
    const authenticatedUserId = req.verifiedUserClaims.sub;
    const result = await BooteService.addBoot(bootInfo, authenticatedUserId);
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not add boat",
    });
  }
});

bootRouter.delete(
  "/:bootId",
  doJwtAuth,
  async function deleteBootByIdCtrl(req, res) {
    try {
      console.log(req.authenticatedUser);
      const bootId = req.params.bootId;
      const authenticatedUserId = req.verifiedUserClaims.sub;
      const result = await BooteService.removeBoot(bootId, authenticatedUserId);
      res.json({ success: true, result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: error.message || "Could not delete boat",
      });
    }
  }
);

bootRouter.patch(
  "/:bootId",
  async function updateBootsReservierungCtrl(req, res) {
    try {
      const bootId = req.params.bootId;
      const reservInfo = req.body;
      const result = await BooteService.toggleReservierung(reservInfo, bootId);
      res.json({ success: true, result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: error.message || "Could not update boat",
      });
    }
  }
);

bootRouter.patch("/edit/:bootId", async function updateBootCtrl(req, res) {
  try {
    const bootId = req.params.bootId;
    const bootInfo = req.body;
    const result = await BooteService.editBoot(bootInfo, bootId);
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not update boat",
    });
  }
});

export default bootRouter;
