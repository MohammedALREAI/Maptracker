import "reflect-metadata";
import { GraphQLServer, Options } from "graphql-yoga";
import core from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();
import logger from "morgan";
import { createConnections } from "typeorm";
import { schema } from "./schema";
const PORT: number = Number(process.env.PORT) || 4000;
import { connectionOptions } from "./ormconfig";

const serverOptions: Options = {
  port: PORT,
  playground: "/playground",
  endpoint: "/graphql",
};

class Server {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer(schema);
    this.setupMiddleware();
    this.runServer();
  }

  private setupMiddleware(): void {
    this.app.express.use(core());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
  }
  /**
   * runServer
   */
  public runServer() {
    createConnections(connectionOptions[0]).then(() => {
      console.log("connection in the db is done 🍕🍕❤🧡🖤");
      this.app.start((serverOptions) => {
        console.log(`the server is Runing ins the port${PORT}🍕🍕❤ haha🧡🖤`);
      });
    });
  }
}

export default new Server();
