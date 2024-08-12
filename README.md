
## Installation

```bash
$ npm install
```

## Configure the app

```bash
# create database using PostgreSQL
$ create database your_db_name;


# copy variables and put your secrets
$ cp .env.example .env

# build the app
$ npm run build

# run migrations
$ npm run db:migrate

# run seeds
$ npm run db:seed
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentation

Documentation was implemented via swagger ui

```
http://localhost:{PORT}/api
```
