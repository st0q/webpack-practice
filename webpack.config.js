// Node.js の path モジュールをインポート
const path = require("path");
// プラグインの読み込み
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// development モードか否か？
const isDev = process.env.NODE_ENV === "development";

/** ↓ エディタで補完を効かせるための JSDoc */
/** @type {import('webpack').Configuration} */
module.exports = {
  // "plugins" エントリーを追加
  plugins: [
    // プラグインのインスタンスを作成
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      // テンプレート
      template: "./src/index.html",
      // <script> ~ </script> タグの挿入位置
      inject: "body",
      // スクリプト読み込みのタイプ
      scriptLoading: "defer",
      // ファビコンも <link rel="shortcut icon" ~ /> として挿入できる
      // favicon: "./src/favicon.ico",
    }),
  ],
  mode: isDev ? "development" : "production",
  entry: "./src/index.jsx",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    // "dist/asset/名前.拡張子" として出力される
    assetModuleFilename: "asset/[name][ext]",
  },
  devtool: isDev ? "source-map" : undefined, // または 'inline-source-map' など
  devServer: {
    static: {
      directory: "./dist",
    },
  },
  module: {
    rules: [
      {
        // 拡張子 js または jsx のファイル（正規表現）
        test: /\.(js|jsx)$/,
        // ローダーの指定
        loader: "babel-loader",
      },
      {
        // 拡張子 scss または css のファイル
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // dev モードではソースマップを付ける
              sourceMap: isDev,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        // 画像やフォントファイル
        test: /\.(ico|png|svg|ttf|otf|eot|woff?2?)$/,
        // type は自動モード
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 2kb 以上なら `asset/resource` する
            maxSize: 1024 * 2,
          },
        },
      },
    ],
  },
  // 依存関係解決に参照するファイルの拡張子を指定
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
