# HumanExperience_Test_07
Project created as a test for HumanExperience employment. Created by Lorenzo Ramón Pérez Morales
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
cd backend_lorenzoperez_humanexperience
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