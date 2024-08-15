FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate  # Ensure Prisma Client is generated
RUN npm run build       # Build the TypeScript project

ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/app.js"]
