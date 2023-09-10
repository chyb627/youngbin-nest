# youngbin-nest

node_nest_backend

### NestJS

- 아키텍처 : 모듈, 컨트롤러, 서비스등 정형화된 아키텍처를 제공한다. 유지보수에 용이하다.
- 데코레이터 사용 : 클래스, 메서드, 속성에 데코레이터 지원한다. 생산성 향상.
- 타입스크립트 지원 : 코드자동완성, 타입에러 판단으로 인한 안정성.
- 의존성 주입 : 의존성 주입을 통해 모듈간 유연한 결합을 한다. 코드 유연성 및 테스트에 용이하다.
- E2E, Unit Test에 용이하다. 유지보수로 인해 발생하는 장애를 방지한다.

### NestJS 기본구조 및 기본개념

- Client (request)-> Controller -> Service -> Controller (response)-> Client

1. app.controller.ts

- NestJS에서는 HTTP 요청을 처리하기 위해 컨트롤러를 사용한다.
- 컨트롤러는 특정 URI 엔드포인트와 HTTP 요청 메서드를 처리하는 메서드를 정의한다.

2. app.service.ts

- NestJS에서는 서비스를 사용하여 컨트롤러에서 사용할 비즈니스 로직을 구현한다.
- 서비스는 컨트롤러와 같은 클래스이며, Injectable 데코레이터를 사용하여 주입한다.

3. app.module.ts

- NestJS에서는 모듈을 사용하여 애플리케이션을 구성한다.
- 모듈은 특정 기능 또는 비즈니스 로직을 담당하는 컴포넌트 집합이다.
- 애플리케이션에 필요한 모든 컨트롤러, 서비스, 프로바이더 및 미들웨어 등을 모듈에 등록한다.

4. 프로바이더(Providers)

- NestJs에서는 프로바이더를 사용하여 의존성 주입을 관리
- 프로바이더는 컨트롤러나 서비스에 사용하는 객체, 함수등을 제공

5. Main.ts

- NestJS 애플리케이션의 진입점
- NestFactory 클래스를 사용하여 NestJS 애플리케이션을 생성
- 생성된 애플리케이션에 필요한 미들웨어 및 모듈을 등록
- HTTP 서버를 시작

6. 모듈(Modules)

- providers: 모듈이 생성하고, 의존성 주입 컨테이너에 추가할 클래스 인스턴스 또는 값의 배열, 주로 서비스와 리포지토리 등이 여기에 포함된다.
- controllers : 모듈이 정의하는 컨트롤러의 배열, 컨트롤러는 클라이언트의 요청을 처리하고, 적절한 응답을 반환하는 역할.
- imports : 모듈이 의존하는 다른 모듈의 배열, NestJS는 이러한 모듈들을 현재 모듈의 providers와 controllers가 사용할 수 있도록 제공한다.
- exports : 모듈에서 제공하며, 다른 모듈에서 import하여 사용할 수 있는 providers의 배열.

7. 기능 모듈 (Feature Modules)

- 애플리케이션의 특정 기능을 캡슐화
- ex. 사용자관리, 상품관리, 주문처리등 특정 기능에 대해 컨트롤러, 서비스, 리포지토리 등을 그룹화

8. 공유 모듈 (Shared Modules)

- 애플리케이션 전반에 공유되는 기능을 제공
- ex. 데이터베이스 접속, 로깅 인증 등 공통적인 작업을 수행하는 기능들을 Shared 모듈로 구성할 수 있음.

```js
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

9. @Global()

- 애플리케이션 전역적으로 사용되는 모듈이라면 Global 데코레이터를 통해 전역적으로 설정 가능.
- Global 데코레이터가 명시되어 있는 모듈은 imports없이 사용가능하다.
- Global 데코레이터는 보통 애플리케이션의 루트나 코어 부분에 구현된다.

10. 컨트롤러(Controller)

- 클라이언트의 요청을 받아 처리하고 응답을 반환하는 역할
- REST API 엔드포인트를 노출하는데 사용

11. Routing

- @Controller 데코레이터 사용
- 모든 표준 HTTP 메서드를 테코레이터 제공한다.

```js
@Controller('boards')
export class DashboardsController {
  @Get()
  get(): string {
    return 'get';
  }

  @Post()
  create(): string {
    return 'create';
  }

  @Put()
  update(): string {
    return 'update';
  }

  @Delete()
  remove(): string {
    return 'remove';
  }
}
```

12. 매개변수와 쿼리스트링

- @Param: 매개변수
- @Query: 쿼리스트링

```js
// ex. /hello/gildong?country=korea
@Get(':name')
get(
  @Param('name') name: string,
  @Query('country') country: string
) {
  return `my name is ${name} from ${country}`;
}
```

13. 서비스(Service)

- 일반적인 비즈니스 로직을 담당
- 컨트롤러가 클라이언트의 요청을 처리하는데 필요한 작업을 처리
- 데이터베이스의 데이터를 가져오거나 외부 API 호출 등의 데이터 처리
- @Injectable 데코레이터 사용 > 클래스가 주입가능한 상태로 변환

14. DI(Dependency Injection, 의존성주입)

- 소프트웨어 엔지니어링 디자인 패턴 중 하나
- 특정 클래스가 의존하고 있는 다른 클래스나 컴포넌트를 직접 만들지 않고, 외부에서 주입받아 사용하는 방식
- 모듈간의 높은 결합도를 줄이고, 유연성과 재사용성을 높이고자 나온 패턴

15. DI 동작 방식

- 클래스는 필요한 의존성을 명시적으로 정의
- DI 컨테이너 또는 IoC(Inversion of Control) 컨테이너는 이러한 의존성을 관리한다. 이 컨테이너는 필요한 의존성을 찾아서 인스턴스를 생성하고, 이를 요청한 클래스에 주입한다.
- 클래스는 직접적으로 의존성을 생성하거나 관리할 필요 없이 해당 의존성을 사용할 수 있게 된다.

16. File Naming Convention

- \*.module.ts
- \*.controller.ts
- \*.service.ts
- \*.repository.ts
- \*.middleware.ts
- \*.decorator.ts
- \*.guard.ts
- \*.exception.ts
- \*.pipe.ts
- NestJS에서는 유형에 따라 접미사를 다르게 구분한다. ex. users.controller.ts

17. 카멜케이스 vs 케밥케이스

- NestJS에서는 대부분 케밥케이스(kebab-case)를 사용
- Javascript와 typescript에서 권장되는 스타일
- 파일시스템에서 대소문자 구분 문제 회피
- URL에서 안전하게 사용할 수 있는 방식
- ex. user-profile.controller.ts

### install step

- npm i -g @nestjs/cli
- 설치가 완료되면 nest라는 명령어를 사용할 수 있게 된다.

- nest new ./
- 현재 폴더로 nest 초기세팅을 한다.

### module 생성

- nest g module boards(모듈명, 복수로 짓는게 일반적임)

### controller 생성

- nest g controller boards(컨트롤러명)

### service 생성

- nest g service boards(서비스명)

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
