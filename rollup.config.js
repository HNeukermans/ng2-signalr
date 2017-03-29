export default {
    entry: './dist/index.js',
    dest: './dist/bundles/ng2-signalr.umd.js',
    format: 'umd',
    // Global namespace.
    moduleName: 'ng.ng2-signalr',
    // External libraries.
    external: [
        '@angular/core',
        '@angular/common',
        '@angular/router',
        'rxjs/Observable',
        'rxjs/Observer'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/router': 'ng.router',
        'rxjs/Observable': 'Rx',
        'rxjs/Observer': 'Rx'
    },
    onwarn: () => { return }
}