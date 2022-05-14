<p align="center" style="margin-bottom: 0px !important;">
  <img width="200" height="200" alt="GeographQL Logo" src="https://raw.githubusercontent.com/robertrenzorudio/geographql-web/main/static/img/logo.svg"/>
</p>

<h1 align="center" style="margin-top: 0px;">GeographQL</h1>
<p align="center" >A Country, State, and City GraphQL API</p>

<p align="center" ><a href="https://geographql.netlify.app">Read the docs</a></p>

<p align="center" ><a href="https://api.geographql.rudio.dev/graphql">Playground</a></p>

<h1 style="margin-top: 0px;">Run Locally</h1>

### Clone the repo

```
$ git clone https://github.com/robertrenzorudio/geographql/
```

### Setup environment variables

## .env
```
# Dababase
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_NAME=
DATABASE_URL=

# Redis 
CACHE_HOST=
CACHE_PORT=
CACHE_PASSWORD=
CACHE_URL=

# Oauth
# Github
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Session
SESSION_NAME=
SESSION_SECRET=
SESSION_DOMAIN=

# Express
PORT=8080
```

## .env.db
```
# Dababase
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

### With yarn

```bash
$ yarn # Install depencies
$ yarn watch # Runs tsc and codegen on watch mode

# On a separate terminal
$ yarn dev
```

### With npm

```bash
$ npm install # Install depencies
$ npm run watch # Runs tsc and codegen on watch mode

# On a separate terminal
$ npm run dev
```
