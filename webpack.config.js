const path = require("path"),
      fs = require("fs"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      HtmlWebpackPlugin = require("html-webpack-plugin");


// declaring constants for paths

const PATH_SRC = path.resolve(__dirname, 'src'),
      PATH_BUILD = path.resolve(__dirname, 'build'),
      PAGES = `${PATH_SRC}/pages`,
//getting path to all subdirs in 'pages' directory
PAGES_DIRS = fs.readdirSync(PAGES)  
            .filter(item => fs.statSync(`${PAGES}/${item}`).isDirectory())
            .map(dir => `${PAGES}/${dir}`);

let PAGES_PUG = [],
    PAGES_JS = [];

// Extracting all .pug and .js files from each page subdirectory

PAGES_DIRS.forEach(dir => {
const pugContent = fs.readdirSync(dir).filter(fileName => fileName.endsWith('.pug')),
      jsContent = fs.readdirSync(dir).filter(fileName => fileName.endsWith('.js'));

PAGES_PUG = [...PAGES_PUG, ...pugContent];

PAGES_JS = [...PAGES_JS, ...jsContent];
});


const config = {
  entry: {},

  output: {
    path: PATH_BUILD,
    clean: true
  },

  module: {
    rules: [

    ]
  },

  plugins: []
};




module.exports = options => {
  console.log(options);
  return config;
};
