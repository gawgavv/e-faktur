import server from './server';

try {
    server.start()
} catch (err) {
    console.error(err)
    process.exit(1);
};