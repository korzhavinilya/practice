tutorial https://sequelize.org/docs/v6/other-topics/migrations/

run specific migration:

```
npx sequelize-cli db:migrate --name 20230524140810-create-person.js
```

list applied migrations:
```
npx sequelize-cli db:migrate:status
```

- or check the SequelizeMeta table in the DB