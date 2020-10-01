import { makeExecutableSchema } from "graphql-tools";
import path from "path";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { GraphQLSchema } from "graphql";

const all_typeDefs: GraphQLSchema[] = fileLoader(
  path.join(__dirname, "./api/**.*.graphql")
);

const all_resolvers = fileLoader(
  path.join(__dirname, "./api/**.*.resolvers.ts")
);

const typeDefs = mergeTypes(all_typeDefs);
const resolvers = mergeResolvers(all_resolvers);

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
