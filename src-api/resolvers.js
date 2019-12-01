module.exports = {
    Query: {
    },
    Node: {
      id: (_, { id }, __) => ({ id }),
      __resolveType: (node, _, __) => 'Equity',
    },
  };