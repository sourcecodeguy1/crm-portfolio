# ---------------------------------------
# 🛠 STAGE 1: Build Angular App
# ---------------------------------------
FROM node:22 AS build
WORKDIR /app

# Copy dependency files first (optimizes build caching)
COPY package.json yarn.lock ./

# Use classic node_modules instead of PnP (fixes Angular CLI issues)
RUN corepack enable && yarn set version stable
RUN yarn config set nodeLinker node-modules

# Install dependencies
RUN yarn install

# Ensure Angular CLI is installed locally in the project
RUN yarn add -D @angular/cli@latest

# Add Angular CLI to PATH
ENV PATH="/app/node_modules/.bin:$PATH"

# Copy the entire project and build Angular
COPY . .

# Create placeholder environment files for build process
RUN mkdir -p /app/src/environments/
RUN echo "export const environment = { production: true, googleAnalyticsId: '' };" > /app/src/environments/environment.prod.ts
RUN echo "export const environment = { production: false, googleAnalyticsId: '' };" > /app/src/environments/environment.ts

RUN ng build --configuration=production

# ---------------------------------------
# 🚀 STAGE 2: Serve with Nginx
# ---------------------------------------
FROM nginx:alpine

# Remove default Nginx HTML files
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output to Nginx
COPY --from=build /app/dist/temp-client/ /usr/share/nginx/html/

# Copy public assets (including config.json)
COPY --from=build /app/public/ /usr/share/nginx/html/assets/

# Add Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
