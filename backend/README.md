## Getting started

1. Install dependencies:
   - php 7.4+
   - composer 2.2+
   - php7.4-sqlite3

2. Set up database:

```
touch database/database.sqlite

php artisan migrate
```

[Database browser for SQLite](https://sqlitebrowser.org/)

3. Linting

```
composer exec tlint
```

[tlint documentation](https://github.com/tighten/tlint)

4. Starting the project

```
php artisan serve
```
