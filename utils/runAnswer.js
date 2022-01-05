process.on("message", function ({ tests, userInput }) {
  const vm = require("vm");

  for (let i = 0; i < tests.length - 1; i++) {
    const test = tests[i];
    const context = vm.createContext({ result: null });
    const userScript = new vm.Script(
      userInput + "\n" + `result = ${test.code}`
    );

    try {
      console.log("beforevm");
      userScript.runInContext(context);
      console.log("aftervm");
    } catch (error) {
      console.log("came to error block");
      process.send({
        type: "execution fail",
        messageString:
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
        messageString:
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
  process.send({
    type: "success",
    messageString: "success",
  });
});
