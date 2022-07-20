# Sample project with NestJs, Prisma and Postgres

## Installation

```bash
$ yarn

# run Postgres db with docker compose
$ cd db/
$ docker compose up

# migrate database
$ yarn prisma migrate dev --name "init database"
```

## Running the app

```bash
# install library
$ yarn
# development 
$ yarn start:dev

# production mode
$ yarn start:prod
```
