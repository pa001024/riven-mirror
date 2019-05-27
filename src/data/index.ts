import Dexie from "dexie";

const db = new Dexie("riven-mirror-db");
db.version(1).stores({
  version: `id, type, hash, date`,
  release: `id, msg, date`,
  weapons: `name, data, *tags`,
  mods: `name, data, *tags`,
  locale: `name, data`,
});

export default db;
