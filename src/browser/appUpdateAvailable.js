
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const LATEST_BUILD_ID_URL = null; //module.config().latestBuildIdUrl;
const BUILD_ID = null; //module.config().buildId;
const MIN_INTERVAL = 10000; //60000 * 10; // 10 mins

let etag;
let interval = MIN_INTERVAL;

let timeout;

const pull = (resolve, reject) => {
  if (!LATEST_BUILD_ID_URL || !BUILD_ID) {
    return reject();
  }
  let headers = {};
  if (etag) {
    headers = {'If-None-Match': etag} // will tell host to return 304 (Not Modified) if nothing changed
  }
  fetch(
    LATEST_BUILD_ID_URL, 
    {headers, credentials: 'include'}
  ).then(response => {
    if (response.status == 200) {
      // Make sure we don't pull too often
      let xPoll = response.headers.get('X-Poll-Interval');
      if (xPoll) {
        interval = Math.max(xPoll * 1000, MIN_INTERVAL);
      }
      etag = response.headers.get('ETag');
      response.json().then((data) => {
        let remoteBuildId = data;
        console.log(`Update: remote: ${remoteBuildId}`);
        if (remoteBuildId != BUILD_ID) {
          resolve();
        }
      });
    }
    if (response.status != 200 && response.status != 304) {
      console.error('Update: Unexpected status', response.status, response.statusText);
    } else {
      console.log('Update:', response.status);
    }
    console.log(`Update: pulling in ${interval}ms`);
    timeout = setTimeout(() => pull(resolve), interval);
  }).catch(error => {
    console.error('Update: fetch error', error);
    console.log(`Update: pulling in ${interval}ms`);
    timeout = setTimeout(() => pull(resolve), interval);
  });
};

const appUpdateAvailable = new Promise(pull);

appUpdateAvailable.then(() => clearTimeout(timeout));

module.exports = appUpdateAvailable;
