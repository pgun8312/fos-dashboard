# FOS Dashboard

## Overview

This project is a REACT Dashbaord for Food Ordering System application consisting of three micro-frontends: admin-dashboard, user-dashboard, and shell-frontend.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Docker](https://www.docker.com/) installed

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
