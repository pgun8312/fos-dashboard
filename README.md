# FOS Dashboard

## Overview

This project is a REACT Dashbaord for Food Ordering System application consisting of three micro-frontends: admin-dashboard, user-dashboard, and shell-frontend.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Docker](https://www.docker.com/) installed

### Include your machine ipv4 address in the .env file to run sonar analysis

1. create .env file and add environment variables
   SONAR_HOST_URL=http://your-dynamic-hostname:8090 (port address of sonarqube server/ define in docker-compose file)

   verify the env set up in the environment
   docker exec -it <container_id> sh
   echo $SONAR_HOST_URL || env

2. to see the ipv4 address
   cmd -> ipconfig

   \*\*result:

   Ethernet adapter Ethernet 2:

   Connection-specific DNS Suffix . : na.sysco.net
   IPv4 Address. . . . . . . . . . . : 10.97.31.71
   Subnet Mask . . . . . . . . . . . : 255.255.224.0

   \*\*use ipv4 address

3. start the sonar qube server and update the login and password in .env file

### Installation Steps

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd fos-dashboard

   ```

2. Install dependencies
   yarn install

3. Install micro-frontends
   yarn pkg:install

## Start the Development Server

    yarn dev

    This command will concurrently start the development servers for admin-dashboard, user-dashboard, and shell-frontend.
    Admin Dashboard: http://localhost:3001
    User Dashboard: http://localhost:3002
    Shell Frontend: http://localhost:3000

## Docker Compose

    To run the micro-frontends using Docker Compose, use the following command:
    docker-compose up

    This will build and start containers for each micro-frontend, making them accessible at the following ports:
    Admin Dashboard: http://localhost:3001
    User Dashboard: http://localhost:3002
    Shell Frontend: http://localhost:3000(start separately due to Cypress installation error)

## Running Package.json Commands in Docker Container

If you need to run specific commands defined in your package.json inside a Docker container, follow these steps:

# Find the Container ID:

docker ps

Look for the container ID associated with the micro-frontend you want to run commands for.

# Enter the Container:

docker exec -it <container-id> sh

Replace <container-id> with the actual container ID.

# Run Package.json Commands:

cd /app
yarn <your-command>

Replace <your-command> with the specific command you want to run.

Example:
yarn sonar-scanner OR sonar-scanner

### Extra DOCKER commands

docker build -t admin-dashboard .

docker images
docker run -p 8080:3000 admin-dashboard

# to build images

docker-compose up

# Stop and remove the containers

docker-compose down

# Recreate containers and rebuild images

docker-compose up --build

# Restart Docker Compose:

If your Docker Compose setup is already running, restart it to apply the changes:
docker-compose down
docker-compose up -d

This will stop the running containers and start them again with the updated environment variables.
