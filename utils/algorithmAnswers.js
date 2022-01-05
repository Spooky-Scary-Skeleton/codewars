function solution1(n) {
  if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  if (n >= 2) {
    return solution(n - 1) + solution(n - 2);
  }
}

function solution2(n) {
  return `김서방은 ${n.findIndex(name => name === "Kim")}에 있다`;
}

function solution3(n) {
  let result = "";

  for (let i = 0; i < n; n++) {
    if (!(i % 2)) {
      result + "수";
    } else {
      result + "박";
    }
  }

  return result;
}

function solution4(n) {
  const numList = n.split("");
  const sum = numList.reduce((acc, cur) => acc + cur);

  if (n % sum) {
    return true;
  }

  return false;
}
