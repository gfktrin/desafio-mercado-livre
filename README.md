## Description

Tor ips collector
## Installation

```bash
# Create a .env file
$ cp .env.example .env
# Install dependencies
$ npm i
```

## Running the app

```bash
# Start services and database with docker
$ docker compose up

# Start only database container
$ docker compose up database

# Start dev locally, be sure to change your 
#.env MONGODB_HOST to localhost before
$ npm run start:dev
```

## Endpoints
Every endpoint is set to use authentication except for the login endpoint, for testing you can comment
line 10 on user controller:
```
// @UseGuards(JwtAuthGuard)
```
That way you can use it to create an user.

#### Auth
* `(POST) /auth/login`
Makes sign in. It expects an object with email and password in body to work, it returns a token to be used as Bearer in Authorization.
Body example:
```
{
    "email": "test@test.com",
    "password": "test123"
}
```
#### User
* `(POST) /`
Creates a new user. It expects an object with name, email, and password in body to work.
Body example:
```
{
    "Name": "Test",
    "email": "test@test.com",
    "password": "test123"
}
```
#### Tor node
* `(GET) /`
Returns an list containing every ip from the defined external sources. Because `dan.me.uk` has a limit of one request by half an hour, it saves the ips and returns the saved ones if the time limit has not been reached.

* `(POST) /`
Saves an ip to database. It expects an object with the ip in the body to work.
Body example:
```
{
    "ip": "100.14.159.254"
}
```

* `(GET) /filtered`
Works in the same way as the `(GET) /` endpoint, but it excludes the ips that were previsiosly resgistered on `(POST) /`.

* `(GET) /exclusion-list`
Returns an list containing the ips that were restered on `(POST) /`.

### How would i execute this project in cloud
* In AWS
I would create an EC2 instance, connect via ssh, download node,docker and docker-compose on it. Then run a container only with the node aplication and use MongoDB Atlas instead of running a conteiner with the database, as it seens more reliable.