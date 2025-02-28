# Use Node.js for building Angular app
FROM node:22 AS build-stage
WORKDIR /app

# ✅ Copy only necessary files for the build process
COPY package.json yarn.lock ./
RUN corepack enable && yarn set version stable
RUN yarn install

# ✅ Copy the rest of the project AFTER dependencies are installed (better caching)
COPY . .

# ✅ Build Angular app
RUN yarn run build --configuration production

# Use Nginx to serve Angular
FROM nginx:alpine

# ✅ Copy built Angular app directly to Nginx's serving directory
COPY --from=build-stage /app/dist/crm-client /usr/share/nginx/html

# ✅ Expose port 3002
EXPOSE 3002

CMD ["nginx", "-g", "daemon off;"]
