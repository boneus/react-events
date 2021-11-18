const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use('/events/by-user', (req, res) => {
  const events = router.db.getState().events;
  let {user} = req.query;
  const userEvents = events.filter(event => event.author === user || event.guest === user);
  res.json(userEvents);
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});