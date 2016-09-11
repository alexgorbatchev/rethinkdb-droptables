import { expect } from "chai";
import * as r from "rethinkdb";
import dropTables from "../src";

const DB = "rethinkdb_deletetables_test_db";
const TABLES = [ "table1", "table2" ];

describe("rethinkdb-droptables", () => {
  let connection: r.Connection;

  function tableList(): Promise<string[]> {
    return r.db(DB).tableList().run(connection);
  }

  before(() =>
    r.connect({ host: "localhost", port: 28015 })
      .then(actual => connection = actual)
      .then(() => r.dbCreate(DB).run(connection))
  );

  beforeEach(() =>
    Promise.all(TABLES.map(table => r.db(DB).tableCreate(table).run(connection)))
  );

  afterEach(() =>
    tableList().then((tables: string[]) =>
      Promise.all(tables.map(table => r.db(DB).tableDrop(table).run(connection)))
    )
  );

  it("deletes all tables", () =>
    dropTables(connection, DB)
      .then(() => tableList())
      .then((tables: string[]) => expect(tables.length).to.equal(0))
  );

  it("deletes specified tables", () =>
    dropTables(connection, DB, [ TABLES[0] ])
      .then(() => tableList())
      .then((tables: string[]) => expect(tables[0]).to.equal(TABLES[1]))
  );
});
