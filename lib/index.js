'use strict';

const mkdirp = require( 'mkdirp' );
const walk = require( 'walk' ).walk;

const join = require( 'path' ).join;
const spawn = require( 'child_process' ).spawn;

let srcPath = 'Please provide a `srcPath`.';
let rootPath = 'Please provide `rootPath`.';
let babelPath = 'Please provide `babelPath`.';

/**
 *
 */
const initialize = ( config ) => {
    srcPath = ( config && config.srcPath ) || srcPath;
    rootPath = ( config && config.rootPath ) || rootPath;
    babelPath = ( config && config.babelPath ) || babelPath;
};

const createReleaseFolderStructure = () => {
    return new Promise( ( resolve, reject ) => {
        const walker = walk( srcPath );

        walker.on( 'directory', ( root, stats, next ) =>
            new Promise( ( resolve, reject ) => {
                const dirPath = join( root, stats.name );
                const relativePath = dirPath.substring( rootPath.length );
                const releasePath = join( rootPath, 'release', relativePath );

                mkdirp( releasePath, ( err ) => resolve( releasePath ) );
            } ).then( next, next )
        );

        walker.on( 'end', () => resolve( true ) );
    } );
};

const transpileFiles = () => {
    const walker = walk( srcPath );

    walker.on( 'file', ( root, stats, next ) => {
        const name = stats.name;

        if ( !name.toLowerCase().endsWith( '.js') ) { return next(); }

        const inFile = join( root, name );
        const relativePath = inFile.substring( rootPath.length );
        const outFile = join( rootPath, 'release', relativePath );

        spawn(
            babelPath, [ '--source-maps', '--out-file', outFile, inFile ]
        );

        next();
    } );
};

/**
 *
 */
const transpile = () => createReleaseFolderStructure().then( transpileFiles );

exports.initialize = initialize;
exports.transpile = transpile;
