# Use an official Node runtime as a base image
FROM node:18-alpine 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Disable SSL verification for yarn
RUN yarn config set strict-ssl false

# Update npm
RUN npm config set registry https://registry.npmjs.org/ \
    && npm install -g npm@latest

# Install the project dependencies
RUN npm install --ignore-optional

# Set up SSL certificates for Cypress
RUN apk add --no-cache openssl \
    && openssl s_client -showcerts -connect download.cypress.io:443 </dev/null 2>/dev/null|openssl x509 -outform PEM > /usr/local/share/ca-certificates/cypress.crt \
    && update-ca-certificates

# Copy the local code to the container
COPY . .

# Install Cypress separately to avoid SSL issues
RUN yarn add cypress --ignore-optional

# Build the React app
RUN yarn build

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run the application
CMD ["yarn", "start:live"]
