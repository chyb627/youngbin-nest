# youngbin-nest

node_nest_backend

### install step

- npm i -g @nestjs/cli
- 설치가 완료되면 nest라는 명령어를 사용할 수 있게 된다.

- nest new ./
- 현재 폴더로 nest 초기세팅을 한다.

### module 생성

- nest g module cats(모듈명, 복수로 짓는게 일반적임)

### controller 생성

- nest g controller cats(컨트롤러명)

### service 생성

- nest g service cats(서비스명)

### middleware 생성

- nest g middleware logger

### pipe

- 파이프는 클라이언트 요청에서 들어오는 데이터를 유효성 검사 및 변환을 수행하여 서버가 원하는 데이터를 얻을 수 있도록 도와주는 클래스.

### Docker Setting

- docker pull postgres
- docker run -d -p 5432:5432 --name pgsql -e POSTGRES_PASSWORD=1234 postgres
- docker exec -it postgres bash
- psql -U postgres
- CREATE DATABASE youngbindb;

#### postgresql

1. SELECT datname FROM pg_database; // show databases
2. CREATE DATABASE youngbindb; //create
3. \c youngbindb; // use db
4. SELECT _ FROM "public"."user"; // SELECT _ FROM user

### Docker yml 컨테이너 실행

- docker-compose up

### 비밀번호 암호화

- npm install bcryptjs --save

#### 비밀번호를 데이터베이스에 저장하는 방법

- 원본 비밀번호를 저장하면 최악.
- 비밀번호를 암호화 키 (Encryption Key)와 함께 암호화(양방향) -> 암호화 키가 노출되면 알고리즘은 대부분 오픈되어있기 때문에 위험도가 높다.
- SHA256등으로 해시(Hash)해서 저장(단방향) -> 레인보우테이블등에 취약함.

### JWT

- JWT는 당사자간에 정보를 JSON 개체로 안전하게 전송하기 위한 컴팩트하고 독립적인 방식을 정의하는 개방형 표준(RFC 7519)이다. 이 정보는 디지털 서명이되어 있으므로 확인하고 신뢰할 수 있다.
- 간단하게 얘기하면 정보를 안전하게 전할 때 혹은 유저의 권한 같은것을 체크를 하기 위해서 사용하는데 유용한 모듈이다.
- Header : 토큰에 대한 메타 데이터를 포함하고 있다. (타입, 해싱 알고리즘 SHA256, RSA ...)
- Payload : 유저정보(issuer), 만료기간(expiration time), 주제(subject)등..
- Ventify Signature : JWT의 마지막 세그먼트는 토큰이 보낸 사람에 의해 서명되었으며 어떤식으로든 변경되지 않았는지 확인하는데 사용되는 서명이다. 서명은 헤더 및 페이로드 세그먼트, 서명 알고리즘, 비밀 또는 공개 키를 사용하여 생성된다.

### LOG

- 로그의 종류
  - LOG : 중요한 정보의 범용 로깅.
  - Warning : 치명적이거나 파괴적이지 않은 처리되지 않은 문제.
  - Error : 치명적이거나 파괴적인 처리되지 않은 문제.
  - Debug : 오류 발생시 로직을 디버그하는 데 도움이되는 유용한 정보. 개발자용.
  - Verbose : 응용 프로그램의 동작에 대한 통찰력을 제공하는 정보.
