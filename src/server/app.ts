import express from "express";
import cors from "cors";
import { ServerInterface } from "./app.interface";
import PlaidClient from "../clients/PlaidClient";

class Server implements ServerInterface {
  private plaidClient = new PlaidClient();
  // eslint-disable-line

  async server(): Promise<express.Application> {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // define a route handler for the default home page
    app.get("/link-token", async (req, res) => {
      // const id = req.body;
      const linkToken = await this.plaidClient.getLinkToken("id");
      console.log(linkToken);
      console.log("hehe");
      res.header("Access-Control-Allow-Origin", "*");
      res.send(linkToken);
    });
    app.use(cors());
    return app;
  }
}

export default new Server();
