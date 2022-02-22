const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path")
const webpack = require("webpack")

module.exports = (env) => {
    const isProd = env.production
    return {
        mode:"production",
        entry:"./src/index.jsx",
        output: {
            path:path.resolve(__dirname,"dist"),
            filename: isProd ? "js/[name].[contenthash:8].js": "js/[name].js",
            clean:true,
            pathinfo: false,
            assetModuleFilename:"assets/[contenthash:8][ext]", 
            asyncChunks:true
        },
        resolve:{
            extensions:[".js",".jsx"],
            symlinks:false
        },
        module: {
            rules:[
                {
                    test:/\.(js|jsx)$/i,
                    use:{
                        loader:"babel-loader",
                        options:{
                            cacheDirectory:true,
                            cacheCompression: false,
                            compact: isProd
                        }
                    },
                    include: path.resolve(__dirname,"src"),
                    exclude:/node_modules/,
                    
                },
                {
                    test:/\.css$/i,
                    use:[isProd ? MiniCssExtractPlugin.loader :"style-loader","css-loader"]
                },
                {
                    test:/\.(jpg|png|gif|jpeg)$/i,
                    type:"asset/inline",
                    generator:{
                        filename:"static/images/[contenthash:8][ext]"
                    }
                },
                {
                    test:/\.svg$/i,
                    type:"asset/inline",
                    generator:{
                        filename:"static/icons/[contenthash:8][ext]"
                    }
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
                    type:"asset/resource",
                    generator:{
                        filename:"static/fonts/[contenthash:8][ext]"
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './public/index.html', favicon: "./public/favicon.ico" }), 
            isProd && new MiniCssExtractPlugin({
                filename:"assets/css/[name].[contenthash:8].css",
                chunkFilename:"assets/css/[id].[contenthash:8].css",
                ignoreOrder:false
            }),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }),
            new CompressionPlugin({
                algorithm: "gzip",
            }),
        ].filter(Boolean),
        devServer: {
            static:"./dist",
            open:true,
            port:3000,
            client: {
                overlay:true
            },
            compress:true,
            historyApiFallback:true
        },
        optimization: {
            minimize:true,
            moduleIds: 'deterministic',
            runtimeChunk:"single",
            splitChunks: {
                chunks:"async",
                cacheGroups:{
                    vendor:{
                        test: /[\\/]node_modules[\\/]/,
                        name:"vendors",
                        enforce:true,
                        chunks:"all"
                    },
                    common: {
                        minChunks: 2,
                        priority: -10
                    }
                }
            },
            sideEffects: true,
            minimizer: [
                `...`,
                new CssMinimizerPlugin({
                    parallel:2
                })
            ]
        },
    }
}