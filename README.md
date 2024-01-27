<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS Authentication Application with JWT

This is a NestJS application that provides a basic authentication system. The application exposes a few endpoints for user registration, login, users and posts.

The application uses PostgreSQL for user data persistence. JWT is used for authentication and token generation.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

## Running the Application

### Docker

To run the application, follow these steps:

Build and run the Docker containers:
```docker-compose up --build -d``` the api runs on `http://localhost:3000/`


## API Endpoints

The application exposes the following endpoints:

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Authenticate a user and return access token.
- `POST /posts`: creates user post.
- `GET /posts`: returns associated user private and public posts.
- `GET /posts/:id`: returns a single post.
- `PATCH /posts/:id`: updates a user post.
- `DELETE /posts/:id`: removes a user post.
- `GET /users`: returns registered users.
- `GET /users/:id`: returns registered user by id.
- `PATCH /users/:id`: updates user by id.
- `DELETE /users/:id`: deletes user by id.

## Environment Variables

The application uses the following environment variables for configuration:
- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `POSTGRES_USER `
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`
- `JWT_SECRET`
- `AWS_S3_REGION `
- `AWS_ACCESS_KEY_ID `
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET`

## License

This project uses the following license: [MIT License](<link>).

