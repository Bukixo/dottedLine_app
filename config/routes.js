const router = require('express'). Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const playersController = require('../controllers/players');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/players')
  .get(playersController.index)
  .post(playersController.create);

router.route('/player/:id')
  .get(playersController.show)
  .put(playersController.update)
  .delete(playersController.delete);

router.route('/register') // after creating folers
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
    .get(sessions.new)
    .post(sessions.create);

router.all('*', (req, res) => res.notFound());

module.exports = router; // turns it into a function
