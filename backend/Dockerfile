ARG NODE_VERSION=22.11.0

# Create build stage
FROM node:${NODE_VERSION}-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build
RUN npm prune --production

# Production stage
FROM node:${NODE_VERSION}-slim

WORKDIR /app

# Copy necessary files from build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
# Start the application
CMD ["node", "dist/src/main"]
