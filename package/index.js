const axios = require('axios');
const { utils } = require('ethers');

// main export
module.exports = function(name, address) {
  return new Promise((resolve, reject) => {
    // ENSVerify provider address
    const provider = '0xa75D20DdA7883CBF720b131938B6DcE4d733F877';

    // json params for axios
    const payload = axios.post('https://verify.ensverify.com/', JSON.stringify({ name }))
    .then(result => {
      // build payload (minimized for data)
      const payload = {
        name, // name to verify
        address, // address to verify
        timestamp: result.data.t, // call timestamp
      };

      // signed digest
      const hashDigest = utils.keccak256(utils.toUtf8Bytes(JSON.stringify(payload)));

      // verified
      if (provider == utils.recoverAddress(hashDigest, result.data.s)) {
        resolve(true)
      } else {
        reject(new Error('The address was not validated by the provider.'));
      }
    })
    .catch(reject);
  });
}
