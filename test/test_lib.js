'use strict';

const babil = require( '..' );
const join = require( 'path' ).join;

babil.initialize( {
    rootPath: join( __dirname, '../examples/sample-project' ),
    babelPath: join( __dirname, '../node_modules/babel-cli/bin/babel.js' )
} );
babil.transpile();
