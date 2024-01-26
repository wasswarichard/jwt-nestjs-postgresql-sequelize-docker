<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS Authentication Application with JWT

This is a NestJS application that provides a basic authentication system. The application exposes a few endpoints for user registration, login, token refresh, and token invalidation.

The application uses PostgreSQL for user data persistence, and Redis for storing refresh token data. JWT is used for authentication and token generation.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

## Running the Application

### Docker

To run the application, follow these steps:

Build and run the Docker containers:
```docker-compose up --build -d```


## API Endpoints

The application exposes the following endpoints:

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Authenticate a user and return access token.

## Environment Variables

The application uses environment variables for configuration. These variables are defined in the `.env` file.

## License

This project uses the following license: [MIT License](<link>).

