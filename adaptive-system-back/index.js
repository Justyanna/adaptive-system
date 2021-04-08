import connect from './src/utils/dbconnection.js';
import app from './src/app.js';

const port = process.env.PORT;

connect();

app.listen(port, () => console.log('\x1b[32m', `Server listening on port ${port}!`));
