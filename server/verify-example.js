const axios = require('axios');
const ethers = require('ethers');

// name in question
const name = 'registrar.firefly.eth';
const address = '0x6fC21092DA55B392b045eD78F4732bff3C580e2c';

// provider address
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
  const hashDigest = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(payload)));

  // verified
  if (provider == ethers.utils.recoverAddress(hashDigest, result.data.s)) {
    console.log('Name has been verified by ENSVerify.com!');
  }
})
.catch(console.log);
