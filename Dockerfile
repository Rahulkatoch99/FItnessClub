FROM node:20-alpine
WORKDIR /app

# Install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# React dev server port
EXPOSE 3000

# Important: bind to 0.0.0.0
ENV HOST=0.0.0.0

CMD ["npm", "start"]
