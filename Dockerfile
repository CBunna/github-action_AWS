#Stage 1: Build Stage

FROM node:18-alpine AS builder

# set working directory
WORKDIR /app

# copy dependency files
COPY package*.json .

# install dependencies
RUN npm ci

# copy the rest of the application code
COPY . .

# Run test suite during container build verification
RUN npm run test

# Compile production bundle to /app/dist
RUN npm run build 

# STAGE 2: Production Nginx Runtime

FROM nginx:alpine-slim AS runner

# remove default nginx static assets, because we will replace it with our custom nginx configuration file
RUN rm -rf /usr/share/nginx/html/*

# copy custom Nginx SPA configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production static assets from builder stage, from location /app/dist to /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html 

# Informs Docker that the container listens on port 80 at runtime.
EXPOSE 80

# Container Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx web server, daemon off; prevents nginx from daemonizing and keeps the process in the foreground
CMD ["nginx", "-g", "daemon off;"]











