# Use Node.js for building Angular app
FROM node:22 AS build-stage
WORKDIR /app
COPY . .

# ✅ Enable Corepack for Yarn 4+
RUN corepack enable && yarn set version stable

# ✅ Install project dependencies
RUN yarn install

# ✅ Build Angular app
RUN yarn run build --configuration production

# Use Nginx to serve Angular
FROM nginx:alpine
COPY --from=build-stage /app/dist/temp-client /usr/share/nginx/html
EXPOSE 3002
CMD ["nginx", "-g", "daemon off;"]
