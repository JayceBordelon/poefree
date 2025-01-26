# Use Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the React app
RUN npm run build

# Install a simple HTTP server for serving the React build
RUN npm install -g serve

# Start the React app
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose the client port
EXPOSE 3000
