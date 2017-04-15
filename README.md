# Manual Order Entry

> Manual Order Entry featuring [Angular 2](https://angular.io), [E2E](https://angular.github.io/protractor/#/faq#what-s-the-difference-between-karma-and-protractor-when-do-i-use-which-), [Karma](https://karma-runner.github.io/), [Protractor](https://angular.github.io/protractor/), [Jasmine](https://github.com/jasmine/jasmine), [Istanbul](https://github.com/gotwarlost/istanbul), [TypeScript](http://www.typescriptlang.org/), [@types](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&cad=rja&uact=8&ved=0ahUKEwjgjdrR7u_NAhUQ7GMKHXgpC4EQFggnMAI&url=https%3A%2F%2Fwww.npmjs.com%2F~types&usg=AFQjCNG2PFhwEo88JKo12mrw_4d0w1oNiA&sig2=N69zbO0yN8ET7v4KVCUOKA), [TsLint](http://palantir.github.io/tslint/), [Codelyzer](https://github.com/mgechev/codelyzer), [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html), and [Webpack 2](http://webpack.github.io/)).

Technologies/Frameworks
* Testing Angular 2 code with Jasmine and Karma.
* Styling with PUG, SASS and Bootstrap 4
* Coverage with Istanbul and Karma
* End-to-end Angular 2 code with Protractor. (Not in use for now)
* Type manager with @types
* Dependency Management with Yarn
* Hot Module Replacement with Webpack and [@angularclass/hmr](https://github.com/angularclass/angular2-hmr) and [@angularclass/hmr-loader](https://github.com/angularclass/angular2-hmr-loader)

# Table of Contents
* [Getting Started](#getting-started)
    * [Config Setup](#config-setup)
    * [Dependencies](#dependencies)
    * [Running the app](#running-the-app)
    * [Troubleshooting](#troubleshooting)
* [Server Commands] (#server-commands)
* [File Structure](#file-structure) (OUTDATED*)
* [TypeScript](#typescript)

# Getting Started

## Config Setup
In MOE:  create a local.json file to your config/environments folder including:
```javascript{
  "CONFIG": {
     "DOMAIN": "http://localhost:3001",
     "API_VERSION": "v3",
     "ENV_NAME": "Local"
     "BLUESNAP_KEYS": {
           "NAMER": <key>
           "EMEA": <key>
     }
}
```

In AMART:  add the following to your local.json
```javascript{
    "moeFrontEndUrl": "http://localhost:5000"
    ...
    "whiteList" : [
        ...
        http://localhost:5000
    ]
}
```

## Dependencies
What you need to run this app:
*  Node `v5.12.0` and NPM `3.8.6`
Once you have those, you should install these globals with `npm install -g`:
* `yarn` (`npm install -g yarn`)
* `webpack` (`npm install -g webpack`)
* `webpack-dev-server` (`npm install -g webpack-dev-server`)
* `karma` (`npm install -g karma-cli`)
* `protractor` (`npm install -g protractor`)
* `typescript` (`npm install -g typescript`)

or this nice one liner:  `npm i -g yarn webpack webpack-dev-server karma protractor typescript`

* `npm install webpack-dev-server rimraf webpack -g` to install required global dependencies
* `yarn install` to install all dependencies


## Running the app
* Run `npm start` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. 
* Go to [http://0.0.0.0:5000](http://0.0.0.0:5000) or [http://localhost:5000](http://localhost:5000) in your browser to only see the UI
* Or use a valid redirect e.g. [localhost:3001/services/v3/moe/r?agentId=agss.user1@autodesk.com.adsksfdev&agentEmail=bhoopathy.velusamy@autodesk.com&customerFirstName=alpha&customerLastName=beta&customerPhone=1234567890&customerEmail=alpha.beta@ssttest.net&customerCountry=us&customerLanguage=de-de&orderOriginRef=11076881&orderOrigin=case
](localhost:3001/services/v3/moe/r?agentId=agss.user1@autodesk.com.adsksfdev&agentEmail=bhoopathy.velusamy@autodesk.com&customerFirstName=alpha&customerLastName=beta&customerPhone=1234567890&customerEmail=alpha.beta@ssttest.net&customerCountry=us&customerLanguage=de-de&orderOriginRef=11076881&orderOrigin=case
) 

## Troubleshooting
* Did you install all the dependencies?
* Are you using the right version of Node/NPM?  Typing `nvm use` + <desired node version> will ensure you are on correct node version. 
* Do you have everything in the [Config Setup](#config-setup) mentioned above?

# Server Commands 
```bash
# development
npm start
# stg/production
npm run build:prod
npm run server:prod
```

### run tests (karma and tslint)
```bash
npm run test
```

### run tests for debugging (in Chrome)
```bash
npm run test:debug
```

### run linting (tslint)
```bash
npm run lint
```

## Other commands

### build files
```bash
# development
npm run build:dev
# production
npm run build:prod
```

### hot module replacement
```bash
npm run server:local:hmr
```

### watch and build files
```bash
npm run watch
```

### watch and run our tests
```bash
npm run watch:test
```

### run end-to-end tests (Not in use)
```bash
# make sure you have your server running in another terminal
npm run e2e
```

### run webdriver (Not in use, for end-to-end)
```bash
npm run webdriver:update
npm run webdriver:start
```

### run Protractor's elementExplorer (Not in use, for end-to-end)
```bash
npm run webdriver:start
# in another terminal
npm run e2e:live
```

## (OUTDATED!!!!!!) File Structure
We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
moe-frontend/
 ├──config/                    * our configuration
 |   ├──helpers.js             * helper functions for our configuration files
 |   ├──spec-bundle.js         * ignore this magic that sets up our angular 2 testing environment
 |   ├──karma.conf.js          * karma config for our unit tests
 |   ├──protractor.conf.js     * protractor config for our end-to-end tests
 │   ├──webpack.dev.js         * our development webpack config
 │   ├──webpack.prod.js        * our production webpack config
 │   └──webpack.test.js        * our testing webpack config
 │
 ├──src/                       * our source files that will be compiled to javascript
 |   ├──main.browser.ts        * our entry file for our browser environment
 │   │
 |   ├──index.html             * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.browser.ts   * our polyfills file
 │   │
 |   ├──vendor.browser.ts      * our vendor file
 │   │
 │   ├──app/                   * WebApp: folder
 │   │   ├──app.component.spec.ts * a simple test of components in app.ts
 │   │   ├──app.e2e.ts         * a simple end-to-end test for /
 │   │   └──app.component.ts   * App.ts: a simple version of our App component components
 │   │
 │   └──assets/                * static assets are served here
 │       ├──icon/              * our list of icons from www.favicon-generator.org
 │       ├──service-worker.js  * ignore this. Web App service worker that's not complete yet
 │       └──robots.txt         * for search engines to crawl your website
 │
 │
 ├──tslint.json                * typescript lint config
 ├──typedoc.json               * typescript documentation generator
 ├──tsconfig.json              * config that webpack uses for typescript
 ├──package.json               * what npm uses to manage its dependencies
 └──webpack.config.js          * webpack main configuration file
 ```
 
# TypeScript
> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

## Use latest TypeScript compiler
TypeScript 1.7.x includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.
```
npm install --global typescript
```
