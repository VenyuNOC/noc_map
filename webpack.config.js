require('dotenv').config();

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnvPlugin = require('dotenv-webpack');
const webpack = require('webpack');


const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [
    new CopyPlugin({
        patterns: [
            { from: path.resolve(__dirname, 'src', 'html'), to: path.resolve(__dirname, 'dist') },
        ]
    }),
    new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css'
    }),
    new DotEnvPlugin()
]
if (isDevelopment) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
    mode: "development",
    entry: './src/main.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader' },
            { 
                test: /\.(c|sc|sa)ss$/, 
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: plugins,
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 4500,
        hot: true,
        open: true
    }
}