# NetSpeedTest

this project is server for https://github.com/ap-performance-test/AP-Performance-Test-Front.git

## Technology Stack

- Framework: Express.js
- Database: MongoDB
- Cloud Storage: Google Cloud Storage
- CI/CD: GitHub Actions, AWS EC2

when frontend tests network speed(upstream, downstream, ping, jitter ...), server provide these link

- /garbage: router to estimate downstream
- /empty: router to estimate upstream, ping ,jitter
- /getIP: router to provide user's IP address

and application of measured data can be achived through api

- /api/speedtest
- /api/speedtest_by_day?day=${day}

and save speedtest's data with user's data in mongodb running in docker container

## Getting Started

1. How to clone the repository

```
git clone https://github.com/ap-performance-test/NetSpeedTest.git

docker-compose up
```

2. How to run the server locally using Docker and docker-compose

- Note: For local development, you should use the docker-compose.local.yml file.

```yml
# set these variables indocker_compose.local.yml

MONGO_URI=mongodb://testuser:testpassword@mongodb:27017/testdb
CLIENT_IP=http://172.30.1.30:5173
```

- For the MONGO_URI, the following environment variables are used:

```dockerfile
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
MONGO_USER=testuser
MONGO_PASSWORD=testpassword
MONGO_DB_NAME=testdb
```

## Running Tests

To run the tests for this project, follow the steps below:

1. Make sure the server is running locally on `http://localhost:4000`.
   or you can change exporting port number with testAPI.ts and docker-compose.local.yml

2. Open a terminal and navigate to the project directory.

3. Run the following command to execute the tests:

   ```shell
   npm test
   ```

# Deployment

if you want deploy to this project to your server, refer to .github/workflow/deploy.yml

# Contributing

We welcome contributions from everyone. Here is how you can contribute to this project:

1. Fork the repository to your own GitHub account.
2. Create a new branch from `development` for your contribution. Please use a meaningful name for the branch that describes the change you are making.
3. Make your changes on your newly created branch.
4. Push the changes to your fork.
5. Submit a Pull Request (PR) to the `development` branch of this repository.

Please ensure that you are making your PR against the `development` branch, not `main`.

Before you make a PR, check that your code follows our coding style and conventions. Also make sure that all tests pass.

If you're planning to add a new feature or change existing behavior, please discuss it by opening an issue before doing the work.

# License

This project is licensed under the terms of the GNU General Public License v3.0 (GPLv3) with the additional permissions noted below.

This project utilizes code from LibreSpeed, which is also licensed under the GPLv3.

This project uses Express.js, which is licensed under the MIT License.

TypeScript is licensed under the Apache License 2.0.

MongoDB is licensed under the Server Side Public License (SSPL).

GitHub Actions, AWS EC2, and Google Cloud Storage are products owned by their respective companies, and their use is subject to their own terms and conditions.
