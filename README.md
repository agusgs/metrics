# Simple metrics system
To use the app follow the instructions in the development setup, once the app is running go to [localhost:3000](http://localhost:3000).
There you'll the existent metrics and you'll be able to create new metrics and post new measures to existent ones. If you click on a metric you'll see the chart for that metric.

### Development Setup
##### Prerequisites

The setups steps expect following tools installed on the system.

- git
- Ruby >= 2.7
- bundler >= 2.2
- Node >= 12
- yarn >= 1.22
- PostgreSQL >= 12

Optionally you can use docker and docker-compose to run the database server, check docker-compose.yml

##### 1. Check out the repository

```bash
git clone git@github.com:agusgs/metrics.git
```

##### 2. Install dependencies

```bash
bundle install
yarn install
```

##### 3. Environment variables

You have an example of the required environment variables in .env-samples

##### 4. Create and setup the database

Run the following commands to create and setup the database.

```bash
bundle exec rails db:create
bundle exec rails db:setup
```

##### 5. Start the Rails server

You can start the rails server using the command given below.

```bash
bundle exec rails s
```

And now you can visit the site with the URL http://localhost:3000

##### 6. Run tests

To run the tests:
```bash
bundle exec rails test
```
