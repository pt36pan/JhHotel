let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let {VueLoaderPlugin} = require('vue-loader');
const config = {
    entry: {
        main: './public/main' //配置的单入口
    },
    output: {
        path: path.join(__dirname, './dist'),//打包后文件的输出目录
        publicPath: '/dist/',//指定资源文件引用的目录，可以是本地目录或者CDN地址等
        filename: '[name].js',
        chunkFilename: "[name].chunk.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]
};
module.exports = config; //相当于 export default config; (前面是ES6写法// )
