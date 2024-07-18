import dexie from 'dexie';

 const db = new dexie('user');

db.version(1).stores({
    user: '++id, name, email, createdAt'
});

export default db;