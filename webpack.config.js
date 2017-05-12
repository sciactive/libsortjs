module.exports = {
    entry: "./src/libsort.js",
    output: {
      library: "LibSort",
      path: __dirname,
      filename: "lib/libsort.js"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
      ]
    }
};
