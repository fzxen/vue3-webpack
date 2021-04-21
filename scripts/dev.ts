import DevServer from "webpack-dev-server";
import webpack from "webpack";
import { genDev } from "./config";

const config = genDev();

const compiler = webpack(config);

const server = new DevServer(compiler, {
  hot: true,
  inline: true,
  overlay: {
    errors: true,
  },
  open: true,
});

server.listen(8081, "127.0.0.1");
