FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN #yarn install --frozen-lockfile
RUN yarn install

FROM node:22-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BOT_NAME
ARG NEXT_PUBLIC_MINI_APP_NAME
ARG NEXT_PUBLIC_MINI_APP_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BOT_NAME
ARG NEXT_PUBLIC_MINI_APP_NAME
ARG NEXT_PUBLIC_MINI_APP_URL

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tailwind.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

COPY --from=builder /app/eslint.config.mjs ./
COPY --from=builder /app/next-env.d.ts ./
COPY --from=builder /app/postcss.config.mjs ./
COPY --from=builder /app/tsconfig.json ./

EXPOSE 3000

CMD ["yarn", "start"]
