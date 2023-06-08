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

1. SELECT datname FROM pg_database; // show databases
2. CREATE DATABASE youngbindb; //create
3. \c youngbindb; // use db

### Docker yml 컨테이너 실행

- docker-compose up
