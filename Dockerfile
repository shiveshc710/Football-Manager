# Use an official Node.js runtime as a parent image
FROM node:22 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js app for production
RUN npm run build

# Use a smaller image for the production environment (optional but recommended)
FROM node:22-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built Next.js app from the builder stage
COPY --from=builder /app /app

# Install dependencies for the production environment
RUN npm install --production

# Expose the port that Next.js app will run on (default is 3000)
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]
