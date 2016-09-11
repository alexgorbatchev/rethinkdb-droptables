# rethinkdb-droptables

A helper method to delete specified or all tables in RethinkDB database.

## Installation

```
npm install rethinkdb-droptables
```

## Usage

```js
import dropTables from "rethinkdb-droptables";

// drop specified tables
dropTables(connection, "db_name", [ "table1", ... ]).then(() => ...);

// drop all tables
dropTables(connection, "db_name").then(() => ...);
```

## License

MIT
