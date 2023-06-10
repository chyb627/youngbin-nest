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
