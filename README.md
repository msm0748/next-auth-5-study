# Next-auth@5를 이용한 카카오 로그인

## 시작하기

### 1. 카카오 애플리케이션 등록

Next-auth를 통한 카카오 로그인을 사용하려면 먼저 [카카오 개발자 사이트](https://developers.kakao.com/console/app)에서 애플리케이션을 등록

### 2. .env.local 파일 생성 후 환경변수 설정

```
# 카카오에서 발급받은 REST API 키
AUTH_KAKAO_CLIENT_ID=your_kakao_client_id

# 카카오에서 발급받은 Client Secret 키
AUTH_KAKAO_CLIENT_SECRET=your_kakao_client_secret

# 아무 secret 키 생성 후 작성 (이 키는 Next-auth의 내부에서 사용됩니다.)
AUTH_SECRET=your_auth_secret
```

### 3. 실행 명령어

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 블로그 참고

1. [카카오 로그인 구현](https://msm1307.tistory.com/151)
