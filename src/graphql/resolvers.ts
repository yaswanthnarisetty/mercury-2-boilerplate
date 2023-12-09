import { GraphQLError } from "graphql/error";
export default {
  Query: {
    hello: (root: any, { name }: { name: string }, ctx: any) => {
      try {
        return `Hello  ${name || "World"}, this is Query`;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    helloWorld: (root: any, { name }: { name: string }, ctx: any) => {
      try {
        return `Hello ${name || "World"}, this is mutation`;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
  }
}