import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';
import checkout from './checkout';
import mockql from './mockQl';
// fake graphql tagged template literal
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: mockql`
    type Mutation {
      addToCart(productId: ID): CartItem
      checkout(token: String!): Order
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      checkout,
    },
  },
});
