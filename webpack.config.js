module.exports = {
    entry: "./src/libsort.js",
    output: {
        path: __dirname,
        filename: "lib/libsort.js"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
      ]
    }
};
