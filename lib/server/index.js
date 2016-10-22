import 'babel-polyfill';

import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import path from 'path';
import routes from 'routes';
import {graphql} from 'graphql';
import {getDataDependencies} from 'relate-js';

import config from '../../config';
import getBaseComponent from './helpers/get-base-component';
import renderHtml from './helpers/render-html';
import routeHandler from './helpers/route-handler';
import schema from './schema';

// Connect mongoose
if (!config.db) {
  throw new Error('Configuration to MongoDB required');
}
mongoose.Promise = global.Promise; // Use native promises
mongoose.connect(config.db.uri, config.db);

const app = express();

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: 100000000}));

// static files
app.use(express.static(path.resolve('public')));

// GraphqQL server
app.use('/graphql', graphqlHTTP(() => ({
  schema,
  graphiql: true
})));

// Scripts
app.use((req, res, next) => {
  res.locals.header = [];
  res.locals.footer = [];

  if (process.env.NODE_ENV !== 'production') {
    res.baseScriptsURL = `http://localhost:${config.devPort}`;
    res.locals.header.push({
      tag: 'script',
      props: {
        src: `${res.baseScriptsURL}/webpack-dev-server.js`
      }
    });
  } else {
    res.baseScriptsURL = '';
  }

  // Script
  res.locals.footer.push({
    tag: 'script',
    props: {
      src: `${res.baseScriptsURL}/assets/index.js`
    }
  });

  // fonts
  res.locals.footer.push({
    tag: 'link',
    props: {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://fonts.googleapis.com/css?family=Abhaya+Libre:400,700|Roboto:500,700'
    }
  });

  next();
});

// Blog routes
app.use('/', (req, res, next) => {
  routeHandler(routes, req, res, next);
});

app.get('/', async (req, res, next) => {
  if (req.routerState) {
    // get component with redux provider and react router
    const component = getBaseComponent(req.store);

    // get relate js data dependencies
    await getDataDependencies(component, async (request) => await graphql(
      schema,
      request.query,
      {},
      request.variables
    ));

    // final render html
    res.status(200).send(renderHtml({
      component,
      store: req.store,
      locals: res.locals
    }));
  } else {
    next();
  }
});

// Not found route
app.use((req, res) => {
  res.status(404).end();
});

// Error route
app.use((error, req, res) => {
  const statusCode = error.statusCode || 500;
  const err = {
    error: statusCode,
    message: error.message
  };
  if (!res.headersSent) {
    res.status(statusCode).send(err);
  }
});

// Start server
const server = app.listen(config.port, () => {
  const port = server.address().port;
  console.log('Listening at port', port); // eslint-disable-line
});
