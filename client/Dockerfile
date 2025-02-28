FROM node:22 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && yarn set version stable && yarn install
COPY . .

# Add this command to ensure you can see your Angular build output
RUN yarn build --configuration=production && ls -la /app/dist/temp-client/

FROM nginx:alpine
# Remove default nginx html content completely
RUN rm -rf /usr/share/nginx/html/*
# Copy your custom configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built app (ensure destination directory exists)
COPY --from=build /app/dist/temp-client /usr/share/nginx/html
# Verify the copy worked
RUN ls -la /usr/share/nginx/html && cat /usr/share/nginx/html/index.html | head -10

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
