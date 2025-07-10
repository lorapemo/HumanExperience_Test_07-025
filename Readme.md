# HumanExperience_Test_07
Project created as a test for HumanExperience employment. Created by Lorenzo Ramón Pérez Morales

I recommend to read this file in the github repo: https://github.com/lorapemo/HumanExperience_Test_07-025/edit/dev/Readme.md
## Setup
In the weird circumstance that the project doesn't work in your machine please contact me so that I create an ngrok link to temporaly host it.
### Prerequisites
- NodeJs
- Npm
- Git
- PostgreSQL
### Getting the basic data
> Clone the repo

```
git clone https://github.com/lorapemo/HumanExperience_Test_07-025.git
```

```
cd HumanExperience_Test_07-025
```

> Switch to dev branch

```
git checkout dev
```

> Install the dependencies

```
npm install
```

### Config your environment
You´ll need to create two files in the root folder (same level as this Readme.md):
> `ormconfig.json`

```
{
  "type": "postgres",
  "host": "localhost",
  "port": "the-port-your-db-is-running-by-defaul-5432",
  "username": "your-db-username",
  "password": "your-db-username",
  "database": "your-db-name",
  "synchronize": true,
  "logging": true,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"]
}
```

> `.env`

```
# Database Configuration
DB_HOST=localhost
DB_PORT=the-port-your-db-is-running-by-defaul-5432
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-username
DB_NAME=your-db-name

# JWT Configuration
JWT_SECRET=your_very_secure_random_string_here
JWT_EXPIRES_IN=3600

# App Configuration

PORT=3000
```
## Run the project
> Check for it on the port 3000
```
npm start
```
## Test
In order to test I recommend using the Thunder Client extension, you can find it in the VS Code extension Store.

The routes are as follows:

### http://localhost:3000/auth/
#### Post
> This should be the first Endpoint you test, as it will allow you to create a user

```
http://localhost:3000/auth/register
```

To run this you'll need a JSON, add the following one in the Body>JSON section of Thunder.

```
{
    "name": "Tester",
    "email": "Tester@mail.com",
    "password": "password"
}
```

> Once you have created a user you'll have to login, remember to copy and paste the Token into the Auth>Bearer section of Thunder

```
http://localhost:3000/auth/login
```

To run this you'll need a JSON, add the following one in the Body>JSON section of Thunder.

```
{
    "email": "Tester@mail.com",
    "password": "password"
}
```

### http://localhost:3000/task

#### Post
> Once logged in.
> Create tasks using this Endpoint

```
http://localhost:3000/task
```

To run this you'll need a JSON, add the following one in the Body>JSON section of Thunder.

```
{
    "name": "Title of the Task",
    "description" : "Description of the Task",
    "userId" : 1
}
```

#### Get
> Once logged in.
> Fetch all existing tasks related to an userID using this Endpoint

```
http://localhost:3000/task/:id
```

You'll need a User id, try using the following:

```
http://localhost:3000/task/1
```

#### Put
> Once logged in.
> Modify a task using this Endpoint

```
http://localhost:3000/task/:id
```

You'll need an Task id and a JSON with the new content, try using the following:

```
http://localhost:3000/task/1
```

```
{
    "name": "Updated title!",
    "description" : "Description of the Task",
    "userId" : 1
}
```

#### Delete
> Once logged in.
> Delete a task using this Endpoint


```
http://localhost:3000/task/:id
```

You'll need an Task id, try using the following route:

```
http://localhost:3000/task/1
```

# Final Words
As I write this document and re-test everything I've noted many ways this project could be better.

To begin with I would change the use of the UserId to assign tasks and instead use their emails.

That would allow a simple way to assign other users Tasks.

This Project begs for a WebSocket implementation to allow you to see who is connected and notify of new Tasks assigned.

It would also be cool to add Swagger to test it.

However, the time constraint has been harsh since life got in the way this past days.
