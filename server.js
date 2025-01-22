const jsonServer = require('json-server');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const PORT = process.env.JSON_SERVER_PORT || 3001;
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  bodyParser: true,
  logger: false,
});

server.use('/api', morgan('tiny'));
server.use('/api', middlewares);
server.use('/api', router);

server.listen(PORT, () => {
  console.log(`JSON server is running on http://localhost:${PORT}`);
});
