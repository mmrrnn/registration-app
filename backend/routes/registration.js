const router = require('express').Router();
let Registration = require('../models/registrationModel');

router.route('/').get((req, res) => {
  Registration.find()
    .then(registrations => res.json(registrations))
    .catch(error => res.json({ error }));
});

router.route('/add').post((req, res, next) => {
  const { name, message, date } = req.body;
  const newRegistration = new Registration({ name, message, date });

  newRegistration.save()
    .then(() => res.json({ success: true }))
    .catch(error => res.json({ error }));
});

module.exports = router;