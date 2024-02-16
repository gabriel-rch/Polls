# Polls
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

![homepage](/images/polls-homepage.png)

## Description

Polls is a Web application that allows users to view, create, and vote on polls, and track the results in real time.

The client-side is built with React, and the server-side is built with Node.js and Fastify. The application uses PostgreSQL and Redis databases to store poll data.

Using websockets, the application updates the poll results in real time as users vote.

## Features

Users are able to create polls with multiple options.
![create-poll](/images/poll-creation.png)

After creating a poll, users can vote on the poll and track the results in real time.
![vote-poll](/images/poll-tracking.png)

## Installation

1. Clone the repository
  ```bash
  git clone https://github.com/gabriel-rch/Polls.git
  cd Polls
  ```  

2. Install the client and server-side dependencies
  ```bash
  cd client
  npm install
  cd ../server
  npm install
  ```  

3. Start the database containers with Docker Compose
  ```bash
  docker compose up -d
  ```

4. Run the server and client with `npm run dev`
  ```bash
  npm run dev
  cd ../client
  npm run dev
  ```

5. Open the application in your browser.


## Contributing

You are free to contribute to this project however you like. Please submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
