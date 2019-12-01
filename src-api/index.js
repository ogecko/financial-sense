const _ = require('lodash')
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Financials = require('./datasources/Financials');
const colors = require('./adapters/colors');
const kodi = require('./adapters/kodi');

const adapters = [ kodi, colors ]

const server = new ApolloServer({ 
    typeDefs: [typeDefs, ...adapters.map(x => x.typeDefs)],
    resolvers: _.merge(resolvers, ...adapters.map(x => x.resolvers)),
    dataSources: () => ({
        financials: new Financials(),
        colors: new colors.ds(),
        kodi: new kodi.ds(),
    }),
    formatError: error => {
        console.log(error);
        return error;
    },
    formatResponse: response => {
        console.log(response.data);
        return response;
    },   
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
