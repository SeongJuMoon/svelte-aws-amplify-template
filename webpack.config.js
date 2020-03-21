const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const { join } = require('path');

module.exports = {
    entry: {
        bundle: [join(__dirname, 'src', 'main.js')]
    },
    resolve: {
        extensions: ['.mjs', '.js', '.svelte', '.ts']
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].js',
        chunkFilename: '[name].[id].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader'
                ]
            },
            {
                test: /\.(html|svelte)$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        preprocess: require('svelte-preprocess')({
                            typescript: {
                                tsconfigFile: './tsconfig.json'
                            }
                        }),                        
                        emitCss: true,
                        hotReload: true
                    },
                },
                exclude: '/node_modules/'
            }
        ]
    },
    mode,
    devtool: prod ? false: 'source-map'
}