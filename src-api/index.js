const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Financials = require('./datasources/Financials');
const Colors = require('./datasources/Colors');

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
        financials: new Financials(),
        colors: new Colors(),
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
