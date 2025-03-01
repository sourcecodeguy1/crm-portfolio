# ---------------------------------------
# 🛠 STAGE 1: Build Angular App
# ---------------------------------------
FROM node:22 AS build
WORKDIR /app

# Copy dependency files first (optimizes build caching)
COPY package.json yarn.lock ./
RUN corepack enable && yarn set version stable && yarn install

# 💡 Copy environment file before the full project (ensures correct API_URL)
COPY src/environments/environment.prod.ts /app/src/environments/environment.prod.ts

# Copy the entire project and build
COPY . .
RUN yarn build --configuration=production

# ---------------------------------------
# 🚀 STAGE 2: Serve with Nginx
# ---------------------------------------
FROM nginx:alpine
# Remove default Nginx HTML files
RUN rm -rf /usr/share/nginx/html/*

# Debug: Check Angular build output structure
RUN mkdir -p /tmp/check
COPY --from=build /app/dist/ /tmp/check/
RUN ls -la /tmp/check/

# ✅ Correct the COPY command based on actual build output
# Check if your build is under "crm-client" or "temp-client"
COPY --from=build /app/dist/crm-client/browser/ /usr/share/nginx/html/
# Alternative:
# COPY --from=build /app/dist/temp-client/ /usr/share/nginx/html/

# Add Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
