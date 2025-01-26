# Dockerfile

FROM node:18

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

RUN npm run dev

# Expose the server port
EXPOSE 4000
