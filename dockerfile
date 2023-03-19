# Node.js 14.x 이미지를 베이스로 사용합니다.
FROM node:14

# 애플리케이션 코드를 /app 디렉토리로 복사합니다.
COPY . /app

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# 애플리케이션을 빌드합니다.
RUN npm install && npm run build

# Express 서버를 실행합니다.
CMD ["npm", "start"]
