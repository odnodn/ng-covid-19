import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as compression from 'compression';
import * as cookieparser from 'cookie-parser';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const domino = require('domino');
  const fs = require('fs');
  const path = require('path');
  const distFolder = join(process.cwd(), 'dist/ng-coronavirus/browser');
  const template = fs.readFileSync(path.join('.', 'dist/ng-coronavirus/browser', 'index.html')).toString();
  const window = domino.createWindow(template);

  // tslint:disable-next-line:no-string-literal
  global['window'] = window;
  // tslint:disable-next-line:no-string-literal
  global['document'] = window.document;
  server.use(compression());
  server.use(cookieparser());

  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const redirectowww = true;
  const redirectohttps = true;
  const wwwredirecto = false;

  server.use((req, res, next) => {

    if (req.url === '/index.html') {
      res.redirect(301, 'https://' + req.hostname);
    }

    if (redirectohttps && req.headers['x-forwarded-proto'] !== 'https' && req.hostname !== 'localhost') {
      if (req.url === '/robots.txt') {
        next();
        return;
      }
      res.redirect(301, 'https://' + req.hostname);
    }

    if (redirectowww && !req.hostname.startsWith('www.') && req.hostname !== 'localhost') {
      res.redirect(301, 'https://www.' + req.hostname + req.url);
    }

    if (wwwredirecto && req.hostname.startsWith('www.') && req.hostname !== 'localhost') {
      const host = req.hostname.slice(4, req.hostname.length);
      res.redirect(301, 'https://' + host + req.url);
    }
    next();
  });

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
