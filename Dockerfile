# Stage 1: Build the app
FROM node:22 AS builder

WORKDIR /app

# Declare build args you expect
ARG NEXT_PUBLIC_BASE_URL

# Copy package.json files
COPY package*.json ./

RUN npm ci

# Copy rest of app files
COPY . .

# Set build-time environment variables for Next.js
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

# Run build with env vars available
RUN npm run build

# Stage 2: Production image
FROM node:22-slim

WORKDIR /app

# Copy package.json files for production install
COPY package*.json ./

RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/node_modules ./node_modules

# # Set runtime environment variables (optional if needed at runtime)
# ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

EXPOSE 3000

CMD ["npm", "start"]
