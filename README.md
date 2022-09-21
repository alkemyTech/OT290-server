# Server Base - Proyecto ONG

## Envinroment setup

1. Create database
2. Copy .env.example to .env and fill with database credentials.

To install dependencies, run

```bash
npm install
```

3. Migrations:

```bash
npx sequelize-cli db:migrate
```

4. Seeders:

```bash
npx sequelize-cli db:seed:all
```

## Start local server

```bash
npm start
```

## Demo users for testing

|         email          |      password      |
| :--------------------: | :----------------: |
| standardUser0@test.com | ##StrongPassword00 |
| standardUser1@test.com | ##StrongPassword01 |
| standardUser2@test.com | ##StrongPassword02 |
| standardUser3@test.com | ##StrongPassword03 |
| standardUser4@test.com | ##StrongPassword04 |
|  adminUser5@test.com   | ##StrongPassword05 |
|  adminUser6@test.com   | ##StrongPassword06 |
|  adminUser7@test.com   | ##StrongPassword07 |
|  adminUser8@test.com   | ##StrongPassword08 |
|  adminUser9@test.com   | ##StrongPassword09 |
