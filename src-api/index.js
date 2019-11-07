const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Financials = require('./datasources/financials');

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
        financials: new Financials()
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
