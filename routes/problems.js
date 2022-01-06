const express = require("express");
const router = express.Router();
const vm = require("vm");

const Problem = require("../models/Problem");
const { ERROR_MESSAGES } = require("../utils/constants");
const errorWithStatus = require("../utils/errorWithStatus");

router.get("/:problem_id", async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findById(problemId).lean();

    res.render("base", {
      problem,
      url: req.originalUrl,
      result: null,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:problem_id", async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findById(problemId).lean();

    if (problem) {
      for (let i = 0; i < problem.tests.length - 1; i++) {
        const test = problem.tests[i];
        const context = vm.createContext({ result: null });
        const userScript = new vm.Script(
          req.body.input + "\n" + `result = ${test.code}`
        );

        try {
          userScript.runInContext(context);
        } catch (error) {
          const mainErrorInfo = error.stack.split("\n")[4];
          res.render("base", {
            url: req.originalUrl,
            result: "failure",
            failureMessage:
              "실행오류!" +
              "\n" +
              "\n" +
              mainErrorInfo +
              "\n" +
              "\n" +
              "내가 제출한 코드:" +
              "\n",
            problemId,
            inputCode: req.body.input,
          });
          return;
        }

        if (context.result !== test.solution) {
          res.render("base", {
            url: req.originalUrl,
            result: "failure",
            failureMessage:
              "틀린 테스트 케이스: " +
              test.code +
              ";" +
              "\n" +
              "제출한 값: " +
              context.result +
              "\n" +
              "정답: " +
              test.solution,
            problemId,
            inputCode: req.body.input,
          });
          return;
        }
      }
      res.render("base", { url: req.originalUrl, result: "success" });
      return;
    }
    next(errorWithStatus(ERROR_MESSAGES.NO_TEST_CASE_FOUND, 404));
  } catch (error) {
    next(errorWithStatus(ERROR_MESSAGES.DB_ERROR, 500));
  }
});

module.exports = router;
