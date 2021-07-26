const path = require("path"),
      fs = require("fs"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      HtmlWebpackPlugin = require("html-webpack-plugin");


// declaring constants for paths

const PATH_SRC = path.resolve(__dirname, "src"),
      PATH_BUILD = path.resolve(__dirname, "build"),
      PAGES = path.join(PATH_SRC, "pages"),
      
//getting path to all subdirs in 'pages' directory

      PAGES_DIRS = fs.readdirSync(PAGES)  
                  .filter(item => fs.statSync(`${PAGES}/${item}`).isDirectory())
                  .map(dir => `${PAGES}/${dir}`);

let PAGES_PUG = [],
    PAGES_JS = [];

// Extracting all .pug and .js files from each page subdirectory

PAGES_DIRS.forEach(dir => {
  const pugContent = fs.readdirSync(dir).filter(fileName => fileName.endsWith(".pug")),
        jsContent = fs.readdirSync(dir).filter(fileName => fileName.endsWith(".js"));

  PAGES_PUG = [...PAGES_PUG, ...pugContent];

  PAGES_JS = [...PAGES_JS, ...jsContent];
});

// Config object

const config = {
  entry: {},

  output: {
    path: PATH_BUILD,
    clean: true
  },

  devServer: {
    publicPath: "/public/",
    openPage: "public/index.html"
  },

  module: {
    rules: [
      {
        test: /\.pug$/i,
        exclude: /node_modules/,
        use: ["html-loader", "pug-html-loader"]
      },

      {
        test: /\.(sass|s?css)$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
              loader: "postcss-loader",
              options: {
                  postcssOptions: {
                      plugins: ["autoprefixer"]
                  }
              }
          },
          "sass-loader"
        ]
      },

      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },

  plugins: []
};

// Modifying config object
module.exports = (env, options) => {

  const isProd = (options.mode === "production") ? true : false;

  // If webpack mode is production, hashing scrits

  config.output.filename = isProd ? "js/[name].[chunkhash].js" : "js/[name].js";

  // If webpack mode is development, creating source maps

  config.devtool = isProd ? false : "eval-cheap-source-map";

  // If webpack mode is production, orienting on browserslist, otherwise - on the modern browsers

  config.target = isProd ? "browserslist" : "web";

  // If webpack mode is production, hashing tyles, images and fonts

  const MiniCssExtractPluginMod = isProd ?  new MiniCssExtractPlugin({
                                              filename: "css/[name].[contenthash].css",
                                              chunkFilename: "[id].[contenthash].css"
                                            }) 
                                            :
                                            new MiniCssExtractPlugin({
                                              filename: "css/[name].css",
                                              chunkFilename: "[id].css"
                                            }),
        imageMod = isProd ?  {
                                test: /\.(png|svg|jpe?g|gif)$/i,
                                exclude: [/node_modules/, /fonts/, /scss/],
                                type: "asset/resource",
                                generator: {
                                  filename: "assets/img/[name].[hash][ext][query]"
                                }
                              } 
                          :
                              {
                                test: /\.(png|svg|jpe?g|gif)$/i,
                                exclude: [/node_modules/, /fonts/],
                                type: "asset/resource",
                                generator: {
                                  filename: "assets/img/[name][ext][query]"
                                }
                              },

        fontMod = isProd ?    {
                                test: /\.(ttf|svg|woff2?|otf|eot)$/i,
                                include: [/fonts/],
                                type: "asset/resource",
                                generator: {
                                  filename: "assets/fonts/[name].[hash][ext][query]"
                                }
                              }
                              :
                              {
                                test: /\.(ttf|svg|woff2?|otf|eot)$/i,
                                include: [/fonts/],
                                type: "asset/resource",
                                generator: {
                                  filename: "assets/fonts/[name][ext][query]"
                                }
                              };
    
    // Generating separate entry point for each page on website

    PAGES_JS.forEach(jsFile => {
      config.entry[jsFile.replace(/\.js/i, "")] = path.join(PAGES, jsFile.replace(/\.js/i, ""), jsFile);
    });

    // Using Html-Webpack-Plugin on every pug page
    
    PAGES_PUG.forEach(page => {
      config.plugins.push(
        new HtmlWebpackPlugin({
          template: `${PAGES}/${page.replace(/\.pug/i, "")}/${page}`,
          filename: page.replace(/\.pug/i, ".html"),
          chunks: [`${page.replace(/\.pug/i, "")}`],
          chunksSortMode: "manual",
          cache: false
        })
      );
    });
  
  config.plugins.push(MiniCssExtractPluginMod);
  config.module.rules.push(imageMod, fontMod);

  return config;
};