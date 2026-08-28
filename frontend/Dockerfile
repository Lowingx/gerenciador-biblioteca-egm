FROM node:20-slim

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN chown -R node:node /app

USER node

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
