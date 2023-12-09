# Use an official Node runtime as a base image
FROM node:18-alpine 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the project dependencies and OpenJDK 17(for run the sonar-scanner)
RUN apk add --no-cache openjdk17 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community \
    && npm install --production --ignore-optional

# Install Sonar Scanner
RUN wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.4.0.2170.zip && \
    unzip sonar-scanner-cli-4.4.0.2170.zip && \
    mv sonar-scanner-4.4.0.2170 /opt/sonar-scanner && \
    rm sonar-scanner-cli-4.4.0.2170.zip

# Add Sonar Scanner to the PATH
ENV PATH="/opt/sonar-scanner/bin:${PATH}"

# Copy the local code to the container
COPY . .

# Build the React app
RUN yarn build

# Expose the port that the app will run on
EXPOSE 3000

# Explicitly set the PATH and define the command to run the application
CMD ["sh", "-c", "export PATH=/opt/sonar-scanner/bin:${PATH} && yarn start:live"]
