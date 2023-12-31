FROM oven/bun:1.0.20-alpine

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .
COPY tsconfig.json .

# ENV NODE_ENV production
CMD ["bun", "run", "start"]

EXPOSE 3000
