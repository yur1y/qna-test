import { Request, Response } from "express";
import { QuestionsService } from "../services/questions";

const QuestionsCtrl = {
  list: async (req: Request, res: Response) => {
    try {
      const questions = await QuestionsService.get();
      res.status(200).send({ success: true, data: questions });
    } catch (e: any) {
      console.error("failed to fetch questions", e);
      res.status(500).send();
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { questions, answers } = req.body;
      const questionLength = questions.trim().length;
      const answersLength = answers.trim().length;
      if (questionLength !== 0 && answersLength !== 0) {
        const { rows } = await QuestionsService.create({
          questions,
          answers,
        });
        res.status(200).send({ success: true, data: rows[0] });
      }
    } catch (e: any) {
      console.error("failed to create questions", e);
      res.status(500).send();
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { questions, id } = req.body;
      const { rows } = await QuestionsService.update({
        id,
        questions,
      });
      res.status(200).send({ success: true, data: rows[0] });
    } catch (e: any) {
      console.error("failed to create questions", e);
      res.status(500).send();
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      console.log(req.params);
      const { id } = req.params;
      const rows = await QuestionsService.delete({
        id,
      });
      res.status(200).send({ success: true, data: rows[0] });
    } catch (e: any) {
      console.error("failed to create questions", e);
      res.status(500).send();
    }
  },
};

export default QuestionsCtrl;
