import express from "express";
import QuestionsCtrl from "../controllers/questionsCtrl";

const router = express.Router();

router.get("/questions", [], QuestionsCtrl.list);

// TODO: add POST / PUT
router.post("/questions", [], QuestionsCtrl.create);

router.put("/questions", [], QuestionsCtrl.update);

router.delete("/questions/:id", [], QuestionsCtrl.delete);
export default router;
