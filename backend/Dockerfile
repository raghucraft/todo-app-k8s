# use the official Node.js 22 image as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install project dependencies
RUN npm install

# copy the rest of the application files
COPY . .

# Tell Docker that the application uses port 3000
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
