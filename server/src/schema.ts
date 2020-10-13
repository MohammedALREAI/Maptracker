import { GraphQLSchema } from "graphql";
import {
  makeExecutableSchema,
  loadFilesSync,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";
import path from "path";

const allTypes = loadFilesSync(path.join(__dirname, "./api/**/*.graphql"));

const resolversArray = loadFilesSync(
  path.join(__dirname, "./api/**/*.resolvers.*")
);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypes),
  resolvers: mergeResolvers(resolversArray),
});

export default schema;
