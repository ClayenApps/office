FROM node:21-bookworm

USER node
WORKDIR /home/node/app

RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.0.35" "linux-x64-baseline"
ENV PATH="${PATH}:/home/node/.bun/bin"

COPY package.json .
COPY bun.lockb .
RUN bun install --production

COPY src src
COPY tsconfig.json .

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000
