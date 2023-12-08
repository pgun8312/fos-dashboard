# Use an official Node runtime as a base image
FROM node:18-alpine 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the project dependencies
RUN npm install --ignore-optional

# Copy the local code to the container
COPY . .

# Build the React app
RUN yarn build

# Expose the port that the app will run on
EXPOSE 3002

# Define the command to run the application
CMD ["yarn", "start:live"]
