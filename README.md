## ENS Verify

A micro-api service which provides a second factor for name reduction verification using elliptic signature proofs for the Ethereum Name Service (ENS).

## About

The Ethereum Name Service (ENS) is awesome, but I've found that I don't always like to trust a single source of name reduction (i.e. infura via my personal connection). I wanted an additional party to reduce the name via their connection, and sign a payload with a pre-established known-address reduction. This way, if my connection is compromised, I know the name reduction from the second party could not be spoofed, as they only sign specific name reductions. This service adds a second layer of security for ENS that is both easy to setup, establish and verify.

## Layout

The code provided is a simple front-end and lambda server written in NodeJS.

`/frontend` the website frontend
`/server` the lambda server which reduces and signs ENS names

## Using the Service to Verify a Name

Below are some examples of using the verification API.

Our server signing address is `0xa75D20DdA7883CBF720b131938B6DcE4d733F877`. This will be known ahead of time and in-wallet client-side.

The signature reduction is as follows.

### Example using Ethers.js:
```js
const axios = require('axios');
const ethers = require('ethers');

// name and address in question
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
```

## Developer Install

```
git clone https://github.com/SilentCicero/ensverify
npm install
```

To run the example:

```
node ./verify-example.js
```

## Now/Zeit

We use now.sh to host our Lambda service.

## License

This project is licensed under the MIT license, Copyright (c) 2019 Nick Dodson. For more information see LICENSE.md.

```
The MIT License

Copyright (c) 2019 Nick Dodson. nickdodson.com <thenickdodson@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
