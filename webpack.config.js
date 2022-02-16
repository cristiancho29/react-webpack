const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

const isProd = process.env.NODE_ENV === "production"
const isDev = !isProd

module.exports = {
    mode:"production",
    entry:"./src/index.jsx",
    output: {
        path:path.resolve(__dirname,"dist"),
        filename: isDev ? "[name].js":"[name].[contenthash].js",
        clean:true,
        pathinfo: false,
    },
    resolve:{
        extensions:[".js",".jsx"],
        symlinks:false
    },
    module: {
        rules:[
            {
                test:/\.(js|jsx)$/i,
                use:["babel-loader"],
                include: path.resolve(__dirname,"src"),
                exclude:/node_modules/
            },
            {
                test:/\.css$/i,
                use:[isProd ? MiniCssExtractPlugin.loader :"style-loader","css-loader"]
            },
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }), 
        new MiniCssExtractPlugin({
            filename:"[name].[contenthash].css",
            chunkFilename:"[id].[contenthash].css",
            ignoreOrder:false
        })
    ],
    devServer: {
        static:"./dist",
        open:true,
        port:3000,
        client: {
            overlay:true
        },
        compress:true,
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk:"single",
        splitChunks: {
            cacheGroups:{
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    name:"vendors",
                    chunks:"all"
                }
            }
        },
        minimizer: [
            `...`,
            new CssMinimizerPlugin()
        ]
    },
}