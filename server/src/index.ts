import 'reflect-metadata';

import server from './server';
import databaseConnection from './configs/database';

databaseConnection.getConnection()
.then(function() {
    server.start();
})
.catch(function(err) {
    console.error(err);
    process.exit(1);
})