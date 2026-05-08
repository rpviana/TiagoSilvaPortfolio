FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app

FROM node:22-alpine AS final

WORKDIR /app

COPY --from=build /app/package*.json ./
RUN npm install --omit=dev

COPY --from=build /app ./

RUN rm -rf /app/dist/public/*
COPY --from=build /app/client/dist /app/dist/public

EXPOSE 5000

CMD ["npm", "run", "start"]