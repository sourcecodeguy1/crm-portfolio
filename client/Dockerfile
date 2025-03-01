FROM node:22 AS build
WORKDIR /app

# Copy dependencies
COPY package.json yarn.lock ./
RUN corepack enable && yarn set version stable && yarn install

# Copy environment file before building (💡 Ensures correct API URL)
COPY src/environments/environment.prod.ts /app/src/environments/environment.prod.ts

# Copy full project and build Angular
COPY . .
RUN yarn build --configuration=production

FROM nginx:alpine
# Remove default nginx html content completely
RUN rm -rf /usr/share/nginx/html/*

# Check Angular build output structure
RUN mkdir -p /tmp/check
COPY --from=build /app/dist/ /tmp/check/
RUN ls -la /tmp/check/

# Copy built Angular app to Nginx
COPY --from=build /app/dist/temp-client/browser/ /usr/share/nginx/html/
# If browser directory contains everything, use this instead:
# COPY --from=build /app/dist/temp-client/ /usr/share/nginx/html/

# Add Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
