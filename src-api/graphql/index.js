const _ = require('lodash')
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const financials = require('./adapters/financials');
const colors = require('./adapters/colors');
const kodi = require('./adapters/kodi');
const logger = require('../logger');

const adapters = [ kodi, colors, financials ]

const graphqlServer = new ApolloServer({ 
    typeDefs: [typeDefs, ...adapters.map(x => x.typeDefs)],
    resolvers: _.merge(resolvers, ...adapters.map(x => x.resolvers)),
    dataSources: () => ({
        financials: new financials.ds(),
        colors: new colors.ds(),
        kodi: new kodi.ds(),
    }),
    formatError: error => {
        console.log(error);
        return error;
    },
    formatResponse: response => {
        // console.log(response.data);
        return response;
    },   
});

// Configure function to setup the graphql endpoint on the express app
module.exports = function (app) {
    const hostname = app.get('host');
    const port = app.get('port');
    logger.info(`Graphql endpoint at http://${hostname}:${port}${graphqlServer.graphqlPath}`)
    graphqlServer.applyMiddleware({ app })
};