# Dockerfile for Axis Consultancy React Website

# --- Stage 1: Build the React Application ---
# Use an official Node.js runtime as a parent image.
# We use the latest stable version for modern features and performance.
FROM node:22-alpine AS build

# Set the working directory in the container.
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files.
# This step leverages Docker's layer caching.
COPY package*.json ./

# Install project dependencies.
RUN npm install

# Copy the rest of the application's source code.
COPY . .

# Build the application for production.
# This creates an optimized static build in the /app/dist directory.
RUN npm run build

# --- Stage 2: Serve the Application with Nginx ---
# Use a lightweight, recent Nginx image for the production environment.
FROM nginx:1.28-alpine

# Copy the static files from the build stage to the Nginx HTML directory.
# The `dist` directory from the previous stage is available here.
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration file.
# This is crucial for single-page applications (SPAs) to handle routing correctly.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to allow traffic to the Nginx server.
EXPOSE 80

# The default Nginx command will start the server.
CMD ["nginx", "-g", "daemon off;"]
