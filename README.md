## 일기

- 봐도 까먹는건 역시...뭔가 만들어봐야겠지
- 일단 쭉 보고, 프론트부분을 고쳐보자
- 1. React
- 2. React + Redux (1. thunk, 2. saga)

## Stack
- Pug
- SCSS
- Express
- MongoDB
- Webpack
- AWS S3
- Heroku

## babel

- 기본적으로는 컴파일러
- 최신 자바스크립트를 이전 버전으로 컴파일

## HTTP

- 서버와 소통하는 방법
- 서버가 서로 소통하는 방법이기도 함
- GET / POST / DELETE / PUT / PATCH
- GET: 페이지를 가쟈오라는 요청

## req, res
- request: 클라이언트로부터 오는 요청에 대한 정보가 들어옴
- response: 요청에 대한 서버의 결과

## Router

- 데이터를 먼저 생각
- 어떤 데이터를 사용할지에 따라 라우더를 분리
- url 공통시작 부분을 기준으로 url을 정리하게 도와줌
- /
- /join
- /login
- /search

- /users/:id
- /users/logout
- /users/edit
- /users/delete

- /videos/:id
- /videos/:id/edit
- /videos/:id/delete
- /videos/upload

## module

- 모든 파일을은 모듈
- import / export 를통해 코드를 주고받을 수 있음

## mongodb / mongoose

- document-based => like object
- vs sql based => like excel
- mongoose 연결다리 => node / mongodb
- Schema변경과 mongoose의 populate를 이용하면 hasToMany와 같은 기능 구현 가능

## model

- 데이터의 모양을 결정
- 저장될 데이터 하나하나의 구조
- say, schema

## 세선

- 백엔드와  브라우저 간에 어떤 활동을 했는지 기록
- 브라우저와 백엔드 사이의 메모리
- 기록의 용도, 브라우저가 백엔드에 요청할떄  누가 요청했는지 알기 위함

## webpack

- 브라우저가 이해 가능한 코드로 바꿔줌
- 오래된 브라우저도 코드를 이해할 수 있게
- 코드 정리
- entry => 소스코드, 처리하고싶은 파일, 파일이 들어오는 경로
- output => 웹팩에 의해 정리된/처리된 파일이 저징되는 경로
