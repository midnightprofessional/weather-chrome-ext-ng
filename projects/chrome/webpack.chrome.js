const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // mode: 'production',
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        background: path.resolve(__dirname, './background.ts'),
        content: path.resolve(__dirname, './content.ts'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.ts$/,
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'manifest.chrome.json'),
                to: path.resolve(__dirname, '../../dist/manifest.json')
            }]
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist')
    },
    optimization: {}
}
