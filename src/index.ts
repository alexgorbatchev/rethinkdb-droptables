import * as r from "rethinkdb";

export default function dropTables(connection: r.Connection, db: string, tablesToDelete?: string[]): Promise<void> {
  return r.db(db).tableList().run(connection)
    .then((tables: string[]) => {
      if (!tablesToDelete) {
        tablesToDelete = tables;
      }

      tables = tables.filter(table => tablesToDelete.indexOf(table) !== -1);

      return Promise.all(tables.map(table =>
        r
          .db(db)
          .tableDrop(table)
          .run(connection)
      ))
      .then(() => Promise.resolve())
      ;
    })
    ;
}
