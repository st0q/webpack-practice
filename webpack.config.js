// development モードか否か？
const isDev = process.env.NODE_ENV === "development";

/** ↓ エディタで補完を効かせるための JSDoc */
/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isDev ? "development" : "production",
  entry: './src/index.jsx',
  devtool: isDev ? "source-map" : undefined,  // または 'inline-source-map' など
  devServer: {
    static: {
      directory: "./dist"
    }
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
        // 拡張子 css のファイル（正規表現）
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // dev モードではソースマップを付ける
              sourceMap: isDev,
            },
          },
        ],
      }
    ]
  },
  // 依存関係解決に参照するファイルの拡張子を指定
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
