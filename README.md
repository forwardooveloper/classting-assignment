# classting-assignment

## HOW TO RUN

해당 프로젝트는 Node.js 20(LTS) 버전으로 진행했습니다.

<br>

### install

```bash
$ pnpm install
```

### local run

1. dynamodb local 실행

```bash
$ docker compose up -d
```

2. dynamodb table 생성

```bash
$ pnpm create:table
```

3. local run

```bash
$ pnpm start:dev
```

### test code run

1. unit test

```bash
$ pnpm test:unit
```

2. integration test

```bash
$ pnpm test:integration
```

<br>

## API Document

http 폴더에 각 API를 호출해볼 수 있는 http 파일을 생성했습니다.
