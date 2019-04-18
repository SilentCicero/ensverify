const verify = require('./index.js');
const test = require('tape');

test('test verification', function (t) {
  t.plan(3);

  // verify test
  verify('registrar.firefly.eth', '0x6fC21092DA55B392b045eD78F4732bff3C580e2c')
  .then(result => {
    t.equal(result, true);
  })
  .catch(console.log);

  // verify test
  verify('registrar.firefly.eth2', '0x6fC21092DA55B392b045eD78F4732bff3C580e2c')
  .then(() => {})
  .catch(error => {
    t.equal(typeof error !== "undefined", true);
  });

  // verify test
  verify('registrar.firefly.eth2', '0x6fC21092DA55B392b045eD78F4732bff3C580e2c')
  .then(() => {})
  .catch(error => {
    t.equal(typeof error !== "undefined", true);
  });
});
