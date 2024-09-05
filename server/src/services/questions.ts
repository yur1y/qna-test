import {
  deleteQuery,
  insertQuery,
  selectQuery,
  updateQuery,
} from "../config/db";

const DEFAULT_QUESTIONS = [
  {
    questions: "What?",
  },
  {
    questions: "Who?",
  },
  {
    questions: "Where",
  },
];

// TODO: use any storage to save the questions
export class QuestionsService {
  static async get() {
    try {
      const questions = selectQuery({
        table: "qna",
        keys: "id, questions, answers",
      });
      return questions;
    } catch (error) {
      console.log(error);
    }
  }
  static async create({ answers, questions }: any) {
    try {
      return await insertQuery("qna", [{ answers, questions }]);
    } catch (e) {
      console.log(e);
    }
  }
  static async update({ id, questions }: any) {
    try {
      const res = await updateQuery("qna", id, { questions });
      return res;
    } catch (e) {
      console.log(e);
    }
  }
  static async delete({ id }: any) {
    try {
      const res = await deleteQuery("qna", id);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
  static async populateQuestions() {
    try {
      const questions = await this.get();
      if (questions.length === 0) {
        await insertQuery("qna", DEFAULT_QUESTIONS);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
// populate database
QuestionsService.populateQuestions();
