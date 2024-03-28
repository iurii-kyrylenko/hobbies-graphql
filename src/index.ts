import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';
import dotenv from "dotenv";
import { MongoDatasource } from './data-sources/mongo';
import { typeDefs } from "./type-defs";
import { resolvers } from './resolvers';

dotenv.config({ path: ".env.local" });

const uri = process.env.CONNECTION_STRING;
const port = +process.env.PORT;

const dbConnection = async () => await connect(uri);

await dbConnection()
    .then(() => console.log("🎉 connected to database successfully"))
    .catch(console.error);

const server = new ApolloServer({
      typeDefs,
      resolvers,
  });
  
const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async () => {
        const { cache } = server;
        return {
            dataSources: {
                mongoDataSource: new MongoDatasource({ cache }),
            },
        }
    }
});

console.log(`🚀  Server ready at: ${url}`);
