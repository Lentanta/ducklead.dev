# Stage 1: Build the static site
FROM node:20-alpine AS builder

# Enable pnpm
RUN corepack enable

WORKDIR /app

# Copy and install deps
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm run build

# Stage 2: Serve static files with nginx
FROM nginx:alpine

# Copy built site from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
