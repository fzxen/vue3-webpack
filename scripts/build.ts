import webpack from "webpack";
import { genProd } from "./config";

const config = genProd();

const compiler = webpack(config);

compiler.run((err, result) => {
  if (err) console.error(err);
  else if (result) {
    const { time, version } = result.toJson();
    console.log(`version: ${version}\ntime: ${time}ms\nhave a nice day!`);
  }
});
