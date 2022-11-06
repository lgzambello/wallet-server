import express from "express";
import cors from "cors";
import { ServerInterface } from "./app.interface";
import baseRouter from "../modules/baseRouter";
import PlaidClient from "src/clients/PlaidClient";

class Server implements ServerInterface {
  private plaidClient = new PlaidClient();
  // eslint-disable-line

  async server(): Promise<express.Application> {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/v1", baseRouter.routes); //setting up base route
    // define a route handler for the default home page
    app.post("/link-token", (req, res) => {
      const id = req.body;
      const linkToken = this.plaidClient.getLinkToken(id);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(linkToken);
    });
    app.use(cors());
    return app;
  }
}

export default new Server();
