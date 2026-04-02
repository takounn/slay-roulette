FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY index.js deploy-commands.js ./
COPY commands/ ./commands/
COPY events/ ./events/
COPY services/ ./services/
COPY utils/ ./utils/
COPY locales/ ./locales/

CMD ["node", "index.js"]
