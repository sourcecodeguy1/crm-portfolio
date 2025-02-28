FROM node:22 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && yarn set version stable && yarn install
COPY . .
RUN yarn build --configuration=production

FROM nginx:alpine
# Remove default nginx html content completely
RUN rm -rf /usr/share/nginx/html/*

# Check Angular build output structure
RUN mkdir -p /tmp/check
COPY --from=build /app/dist/ /tmp/check/
RUN ls -la /tmp/check/

# Copy the built app correctly - adjust this path based on what you see
COPY --from=build /app/dist/temp-client/browser/ /usr/share/nginx/html/
# Or if browser directory contains everything including index.html:
# COPY --from=build /app/dist/temp-client/ /usr/share/nginx/html/

# Add Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
