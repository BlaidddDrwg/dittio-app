const kue = require('kue');

const queue = kue.createQueue();

const contactCtrl = {};

contactCtrl.submitForm = (req, res) => {
  const { name, email, phone, message } = req.body;

  const job = queue.create('contact', {
    title: 'Contact Form Submission',
    from: 'contact@ditt.io.',
    name,
    email,
    phone,
    message,
  })
    .removeOnComplete(true)
    .save((err) => {
      if (err) {
        console.error(err);
        return res.status(400).end();
      }

      job.on('complete', () => { console.log(`job for ${req.body.email} complete!`); });
      job.on('failed', () => { console.error(`job for ${req.body.email} failed!`); });

      return res.status(201).end();
    });
};

module.exports = contactCtrl;