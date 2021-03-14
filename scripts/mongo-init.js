db.createUser({
  user: 'root',
  pwd: 'desafio123',
  roles: [
    {
      role: 'readWrite',
      db: 'desafio-db',
    },
  ],
});
