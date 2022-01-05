const express = require("express");
const router = express.Router();
const cluster = require("cluster");
const vm = require("vm");

const Problem = require("../models/Problem");

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
    console.log("what is this", problem.tests);

    if (problem) {
      cluster.setupMaster({
        exec: "../utils/runAnswer",
      });

      cluster.on("online", function (worker) {
        let timer = 0;

        worker.on("message", function (msg) {
          clearTimeout(timer); //The worker responded in under 5 seconds, clear the timeout
          console.log(msg);
          worker.destroy(); //Don't leave him hanging
        });

        timer = setTimeout(function () {
          worker.destroy(); //Give it 5 seconds to run, then abort it
          console.log("worker timed out");
        }, 5000);

        worker.send({ tests: problem.tests, userInput: req.body.input }); //Send the code to run for the worker
      });

      cluster.fork();

      for (let i = 0; i < problem.tests.length - 1; i++) {
        const test = problem.tests[i];
        const context = vm.createContext({ result: null });
        const userScript = new vm.Script(req.body.input + "\n" + `result = ${test.code}`);

        try {
          userScript.runInContext(context);
        } catch (error) {
          res.render("base", {
            url: req.originalUrl,
            result: "failure",
            failureMessage:
              "실행오류!: " +
              error.message +
              "\n" +
              "\n" +
              "실행오류 스택: " +
              "\n" +
              error.stack,
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
          });
          return;
        }
      }

      res.render("base", { url: req.originalUrl, result: "success" });
      return;
    }

    next(new Error("no test case for this problem."));

    // console.log("this runs", req.body.input, problem);
    // console.log("this runs", eval(req.body.input));
    // console.log("this runs", solution);
    // console.log("eval running test code", eval(problem.tests[0].code));
    // res.send("hey!!!!!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
