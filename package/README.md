## ENS Verify

A library for the ENSVerify micro-service which provides a second factor for name resolution verification using elliptic signature cryptography for the Ethereum Name Service (ENS).

If you are using ENS with a compromised connection, router or on public wifi your ENS resolver can currently provide you an INVALID or MALICIOUS address. In order to prevent this, wallets should integrate some form of second-ens verification factor such as ENSVerify.

## Usage

```
npm install --save ensverify
```

```js
const verify = require('ensverify');

// verify a specfici name and address to be correct
verify('registrar.firefly.eth', '0x6fC21092DA55B392b045eD78F4732bff3C580e2c')
.then(result => console.log(result)) // true
.catch(console.log);

// Returns Promise Object
// true if verified correct
// throws otherwise
```

## How does it work?

ENSVerify provides a signed payload which can verify if an address is correct from a second source. The server simply pings infura or some service from a second location outside your connection, and checks the name and address resolution, it than returns a signed payload, which if correct and true will reduce to our servers address. Wallets and other infra. can simply integrate this library locally for a second source of verification.

## License

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
