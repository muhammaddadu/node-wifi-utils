# node-wifi-utils [![Code Climate](https://codeclimate.com/github/muhammaddadu/node-wifi-utils/badges/gpa.svg)](https://codeclimate.com/github/muhammaddadu/node-wifi-utils) [![Build Status](https://travis-ci.org/muhammaddadu/node-wifi-utils.svg?branch=master)](https://travis-ci.org/muhammaddadu/node-wifi-utils)

Provides Wifi utils for Node.JS such as scanning for nearby access points and triangulate your WiFi signal to guess geolocation.

## Usage
```bash
npm install node-wifi-utils --save
```

```javascript
import Wifi from 'node-wifi-utils';
// OR
const Wifi = require('node-wifi-utils');
```

```javascript
// Get access points
wifi.scan()
    .then(function (accessPoints) {
        console.log(accessPoints);
        // Get location from access points
        Wifi.locationFromAccessPoints(accessPoints)
            .then(function (location) {
                console.log(location);
            })
    });

// Get location from nearby access points
wifi.location()
    .then(function (location) {
        console.log(location);
    });
```

## Testing
Testing can be run on the host operating system using ```npm test```.

To test this project in a Linux enviroment, a Dockerfile is provided.
```
docker build -t muhammaddadu/node-wifi-utils .
docker run muhammaddadu/node-wifi-utils
```

## Licence
Copyright (c) 2016 Muhammad Dadu

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
