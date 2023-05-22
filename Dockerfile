# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install any needed dependencies
RUN npm ci

# Copy the rest of the application code into the container
COPY . .

# Install Truffle globally
RUN npm install -g truffle

# Expose the port the app runs on
EXPOSE 4000

# Start the server
CMD [ "npm","run","start-prod" ]