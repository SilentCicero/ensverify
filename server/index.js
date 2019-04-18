// require global packages
const { utils, providers } = require('ethers');
const { json, send } = require('micro');
const Joi = require('joi');

// signer key
const privateKey = new utils.SigningKey(process.env.ensVerifyPrivateKey);

// validate notify
const validationSchema = {
  name: Joi.string().min(3).max(250).required(),
};

// setup infura provider mainnet
const provider = new providers.InfuraProvider("homestead", "942ac122c104479cab942a562071d460");

// Notify lambda
module.exports = async (req, res) => {
  try {
    // intercept and parse post body
    const body = await json(req);
    const {
      name,
    } = body;

    // joi validate the body
    const { error } = Joi.validate(body, validationSchema);
    if (error) throw new Error(error);

    // setup date before resolver call
    const timestamp = Math.round((new Date()).getTime() / 1000);

    // resolve ens name
    const address = await provider.resolveName(name);

    // buiild payload (minimized for data )
    const payload = {
      name,
      address,
      timestamp,
    };

    // signed digest
    const signature = utils
      .joinSignature(privateKey
          .signDigest(utils.keccak256(utils.toUtf8Bytes(JSON.stringify(payload)))));

    // return true
    send(res, 200, { s: signature, t: timestamp });
  } catch (error) {
    send(res, 400, error.message);
  }
}
