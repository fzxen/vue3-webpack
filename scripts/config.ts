import { Configuration, HotModuleReplacementPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import EslintPlugin from "eslint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import merge from "webpack-merge";
import path from "path";

const ab = (r: string) => path.resolve(__dirname, r);

const mode = process.env.NODE_ENV;
const isAnalyzer = process.env.BUILD_MODE === "analyzer";
const isDev = mode === "development";

function genCommon(): Configuration {
  return {
    entry: ab("../src/index.ts"),

    resolve: {
      extensions: [".ts", ".tsx", ".vue", ".js"],
      alias: {
        "@": "../src",
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                appendTsSuffixTo: [/\.vue$/],
              },
            },
          ],
        },
        {
          test: /\.vue$/,
          use: ["vue-loader"],
        },
        {
          test: /\.scss/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpg|jpeg|svg|gif|ico)$/i,
          loader: "url-loader",
          options: {
            limit: 3 * 1024, // 3K
            name: `assets/images/${
              isDev ? "[name].[ext]" : "[name][contenthash:8].[ext]"
            }`,
            esModule: false,
          },
        },
        {
          test: /\.(pdf|mp4|mp3|avi|flv)$/i,
          loader: "url-loader",
          options: {
            name: `assets/files/${
              isDev ? "[name].[ext]" : "[name][contenthash:8].[ext]"
            }`,
            esModule: false,
          },
        },
        {
          test: /\.(eot|ttf|woff)$/i,
          loader: "url-loader",
          options: {
            name: `assets/fonts/${
              isDev ? "[name].[ext]" : "[name][contenthash:8].[ext]"
            }`,
            esModule: false,
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: ab("../public/index.html"),
      }),
    ],
  };
}

export function genDev(): Configuration {
  const common = genCommon();
  return merge(common, {
    output: {
      filename: "[name].js",
      path: ab("../dist"),
    },

    mode: "development",

    devtool: "inline-cheap-module-source-map",

    plugins: [
      new EslintPlugin({
        extensions: ["ts", "vue", "js"],
        fix: true,
        threads: true,
      }),
      new HotModuleReplacementPlugin(),
    ],
  });
}

export function genProd(): Configuration {
  const common = genCommon();
  const config = merge(common, {
    output: {
      filename: "./assets/js/[name:chunkhash].js",
      path: ab("../dist"),
    },

    mode: "production",

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "assets/style/[name].[contenthash].css",
      }),
    ],
  });
  if (isAnalyzer) config.plugins?.push(new BundleAnalyzerPlugin());
  return config;
}
