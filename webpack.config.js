
module.exports = {
    entry: './src/index.ts',
    output: {
        path: __dirname,
        filename: 'lib/bundle/index.js',
        libraryTarget: 'umd', // !!
        // Name of the generated global.
        library: 'ng2-signalr'
    },

    resolve: {

        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['.ts', '.js', '.json'],

    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /\.spec\.ts$/,
                query: {
                        sourceMap: false,
                        inlineSourceMap: true,
                        compilerOptions: {
                            removeComments: true,
                            declaration: true
                        }
                    }
            }
        ]
    }
};