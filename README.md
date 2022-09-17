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

|         email          |   password    |
| :--------------------: | :-----------: |
| standardUser0@test.com | testPassword0 |
| standardUser1@test.com | testPassword1 |
| standardUser2@test.com | testPassword2 |
| standardUser3@test.com | testPassword3 |
| standardUser4@test.com | testPassword4 |
|  adminUser5@test.com   | testPassword5 |
|  adminUser6@test.com   | testPassword6 |
|  adminUser7@test.com   | testPassword7 |
|  adminUser8@test.com   | testPassword8 |
|  adminUser9@test.com   | testPassword9 |
