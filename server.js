const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  bodyParser: true,
  logger: true,
});

server.use('/api', middlewares);
server.use('/api', router);

server.listen(process.env.JSON_SERVER_PORT, () => {
  console.log(`JSON server is running on http://localhost:${process.env.JSON_SERVER_PORT}`);
});
