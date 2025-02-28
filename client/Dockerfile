# Use Node.js for building Angular app
FROM node:22 AS build-stage
WORKDIR /app

# ✅ Copy only necessary files for better caching
COPY package.json yarn.lock ./
RUN corepack enable && yarn set version stable
RUN yarn install

# ✅ Copy the rest of the app after dependencies are installed
COPY . .

# ✅ Build Angular app
RUN yarn run build --configuration production && ls -l /app/dist/ && ls -l /app/dist/temp-client

# Use Nginx to serve Angular
FROM nginx:alpine

# ✅ Copy built Angular app directly to Nginx's serving directory
COPY --from=build-stage /app/dist/temp-client /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# ✅ Expose port 3002
EXPOSE 3002

CMD ["nginx", "-g", "daemon off;"]
