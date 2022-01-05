process.on("message", function ({ tests, userInput }) {
  const vm = require("vm");

  script.runInNewContext(ctx);

  //Send the finished message to the parent process

  for (let i = 0; i < tests.length - 1; i++) {
    const test = problem.tests[i];
    const context = vm.createContext({ result: null });
    const userScript = new vm.Script(
      userInput + "\n" + `result = ${test.code}`
    );

    try {
      userScript.runInContext(context);
    } catch (error) {
      process.send({
        yype: "execution fail",
        message:
        "실행오류!: " +
          error.message +
          "\n" +
          "\n" +
          "실행오류 스택: " +
          "\n" +
          error.stack
      });
      return;
    }

    if (context.result !== test.solution) {
      process.send({
        type: "wrong submission",
        message:
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
    }
  }
  process.send({
    type: "success",
    message: "success",
  });
});
