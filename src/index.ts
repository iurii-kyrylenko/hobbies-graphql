import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Mongoose, connect } from "mongoose";
import { readFileSync } from "fs";
import { MongoDataSource } from "./data-sources/mongo";
import { resolvers } from "./resolvers";
import { registerModels } from "./models/register-models";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

export interface IContextValue {
    dataSources: {
        mongoDataSource: MongoDataSource;
    };
}

// dotenv.config();
dotenv.config({ path: ".env.local" });
const dbConnectionString = process.env.CONNECTION_STRING;
const port = +process.env.PORT;

let dbConnection: Mongoose;
try {
    dbConnection = await connect(dbConnectionString);
    registerModels();
    console.log("🎉 Connected to database");
} catch (error) {
    console.log(error);
}

const server = new ApolloServer<IContextValue>({
      typeDefs,
      resolvers,
  });
  
const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async () => {
        // const { cache } = server;
        return {
            dataSources: {
                mongoDataSource: new MongoDataSource(dbConnection),
            },
        }
    }
});

console.log(`🚀 Server ready at: ${url}`);
