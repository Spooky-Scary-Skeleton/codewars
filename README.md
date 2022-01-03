# Codewars

![Codewars](/codewars.png)

[Codewars](https://codewars.com)와 같이 등록되어 있는 알고리즘 문제를 풀 수 있는 어플리케이션입니다.

## Setup

```sh
npm install
```

## Development

```sh
npm run dev
```

## Project Structure

기본적인 과제 프로젝트 구성을 따르되, [Project Structure](https://www.freecodecamp.org/news/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c/)등 인터넷 자료 혹은 기존 과제의 구조를 참고하여 자유롭게 변경하셔도 됩니다.

## Keep in mind

이번 과제에서는 아래 사안들에 대해 깊게 고민하며 작업하세요.

1. Monolith 구조에 대한 이해
2. 사용자 인증 Flow에 대한 이해 i.e. 세션 vs 토큰 방식

## TODO

### 1. GET `/login`

- [ ] 로그인 버튼이 보여져야 합니다.
- [ ] 로그인에 성공하면 `/` 페이지로 이동해야 합니다.
- [ ] 로그인에 실패하면 `/login` 페이지로 다시 돌아와야 합니다.
- [ ] 로그인 하지 않은 사용자는 로그인 페이지 이외의 그 어떤 페이지도 방문할 수 없어야 합니다.
- [ ] Passport 모듈을 사용하여 소셜 로그인이나 일반 가입 및 로그인 중 한 가지를 선택하여 세션 기반의 로그인 기능을 구현하세요.

#### Resource

Passport 모듈 설정은 생각보다 까다롭습니다. Passport 모듈이 어떤 식으로 사용자 인증을 구현해주는지 고차원적인 측면에서 이해하는 것은 중요하지만, 구체적인 Passport 메소드 등의 사용법 자체를 매우 상세하게 파악하는 것은 "지금 당장" 우리에게 크게 중요치 않습니다. 아주 디테일한 Passport 사용법 자체에 집중하지 마시고, 기능 구현이 되었다면 충분하니 사용자 인증에 대한 고차원적인 Flow 이해에 집중하세요.

- [Passport Github](https://github.com/jaredhanson/passport-github)
- [Passport Example](https://github.com/passport/express-4.x-facebook-example)
- [Passport Flow Explanation](http://toon.io/understanding-passportjs-authentication-flow/)

### 2. GET `/`

- [ ] `/views/index.ejs` template을 보여주어야 합니다.
- [ ] `/models/sample_problems.json`의 정보를 데이터베이스에 삽입하세요.
  - 일회성 작업이므로 서버 쪽 코드 작성없이 MongoDB Compass 등을 이용하세요.
  - 데이터베이스는 MongoDB Atlas를 이용하세요.
- [ ] 데이터베이스에 넣어둔 문제 정보를 이용하여 문제 정보를 보여주도록 기존 템플릿을 수정해주세요. 문제 이름, 정답자 수, 문제 레벨의 정보가 보여야 합니다.
- [ ] 리스트의 각 문제들을 눌렀을때, `/problems/:problem_id` 페이지로 이동하도록 해주세요.

#### Resource

- [EJS Language Support](https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support)

### 3. GET `/problems/:problem_id`

- [ ] `problem_id`에 해당하는 문제의 상세 정보(문제 이름, 정답자 수, 문제 레벨, 그리고 문제에 대한 설명 등)을 화면에 보여주세요. UI 구성은 자유롭게 해주세요.
- [ ] 문제에 대한 솔루션 코드를 입력할 수 있는 폼과 정답을 제출할 수 있는 버튼을 보여주세요.
- [ ] 해당 폼을 작성하여 "제출" 버튼을 눌렀을때, `POST /problems/:problem_id`로 솔루션 정보를 보내세요. **AJAX는 사용하지 마세요.**

#### Resource

코드 편집기를 손쉽게 구현하기 위해서 Code Mirror 라는 라이브러리를 사용할 수 있습니다.

- [CodeMirror](https://github.com/codemirror/CodeMirror): In-browser code editor

아래의 깃허브 레포지토리에서 사용하는 방식을 확인해보고, 여러분의 Code Wars 프로젝트에 Code Mirror를 적용해보세요.

- [CodeMirror Example](https://github.com/codemirror/CodeMirror/blob/master/demo/preview.html)

### 4. POST `/problems/:problem_id`

- [ ] 클라이언트로부터 제출받은 코드 정보를 데이터베이스의 정답 코드를 이용하여 정답이 모두 일치하는지 판별하고 아래와 같은 형식으로 대응해주세요.
- [ ] 제출된 코드가 테스트 케이스를 모두 통과했을 경우, `success.ejs` 템플릿을 생성하여 축하 메시지를 보여주세요. 그리고 다시 문제 리스트 화면으로 이동할 수 있는 링크도 보여주세요.
- [ ] 제출된 코드가 테스트 케이스를 모두 통과하지 못했을 경우, `failure.ejs` 템플릿을 생성하여 결과를 보여주세요. 어떤 테스트 케이스가 통과하지 못하였는지에 대한 설명도 보여주세요.
- [ ] 제출된 코드로 인한 실행 오류가 발생했을 경우, `failure.ejs` 템플릿을 보여주어야 하고 어떤 오류가 발생했는지 상세히 표기해주어야 합니다.
- [ ] 사용자가 제출한 코드를 실행하는 방법에 대해서 깊이 고민해보시기 바랍니다.

#### Resource

> "`eval` is Evil: The eval function is the most misused feature of JavaScript. Avoid it."
>
> -- <cite>Douglas Crockford in JavaScript: The Good Parts</cite>

> "`eval` isn’t evil, just misunderstood."
>
> -- <cite>Nicholas C. Zakas</cite>

- `eval`은 도대체 무엇일까요? `eval`을 사용해야 할까요? 다른 선택지는 어떤 것들이 있을까요?

### 5. Error & Invalid URL

- [ ] 오류 발생시, 발생한 문제에 대한 메시지와 함께 `error.ejs` 템플릿을 보여주세요.
- [ ] 유효하지 않은 URL로 들어왔을 경우, 404 Not Found 메시지를 표기해주어야 합니다.
- [ ] 서버 내부적인 문제가 발생했을 경우, 500 Internal Server Error 메시지를 표기해주어야 합니다. (보안 상의 이유로 사용자에게는 절대 내부 오류에 대한 상세 내용을 보여주어선 안됩니다.)

## After

1. [데이터 스키마 디자인 챌린지](/assets/schema.md) 해결
2. [Heroku 배포하기](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment) + 환경 변수 설정
3. 서버 단위 테스트 작성하기
