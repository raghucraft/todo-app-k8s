# Use the lightweight official Nginx image
FROM nginx:alpine

# Copy all frontend files
# (index.html, style.css, script.js) into Nginx's default web directory
COPY . /usr/share/nginx/html

# Replace the default Nginx configuration with our custom configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Inform Docker that Nginx listens on port 80
EXPOSE 80