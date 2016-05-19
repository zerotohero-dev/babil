'use strict';

const babil = require( '..' );
const join = require( 'path' ).join;

babil.initialize( {
    rootPath: join( __dirname, '../examples/sample-project' )
} ).then(
    babil.transpile,
    () => setTimeout( () => process.exit( 1 ), 500 )
);
