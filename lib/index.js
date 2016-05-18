'use strict';

/*
 *  ____    __    ____  ____  __   
 * (  _ \  /__\  (  _ \(_  _)(  )  
 *  ) _ < /(__)\  ) _ < _)(_  )(__ 
 * (____/(__)(__)(____/(____)(____)
 * 
 * This project is a part of the “Byte-Sized JavaScript” videocast.
 * 
 * You can watch “Byte-Sized JavaScript” at: https://bit.ly/bytesized
 * 
 * MIT Licensed — See LICENSE.md
 * 
 * Send your comments, suggestions, and feedback to me@volkan.io 
 */

const mkdirp = require( 'mkdirp' );
const walk = require( 'walk' ).walk;

const join = require( 'path' ).join;
const spawn = require( 'child_process' ).spawn;

const version = require( '../package.json' ).version;

let rootPath = join( __dirname, '..' );
let srcPath = '';
let releasePath = '';
let babelPath = '';

/**
 *
 */
const initialize = ( config ) => {
    let {
        srcPath:src,
        releasePath:release,
        babelPath:babel,
        rootPath:root
    } = config;

    if ( !root ) {
        throw 'Please provide a root path.';
    }

    rootPath = root;
    srcPath = src || join( root, 'lib' );
    releasePath = release || join( root, 'release' );
    babelPath = babel || join( root, 'node_modules/babel-cli/bin/babel.js' );

    console.log( ` ____    __    ____  ____  __   
(  _ \\  /__\\  (  _ \\(_  _)(  )  
 ) _ < /(__)\\  ) _ < _)(_  )(__ 
(____/(__)(__)(____/(____)(____) (v.${version})
    
Will transpile all the files…
     from: \`${srcPath}\`,
       to: \`${releasePath}\`,
    using: the \`babel\` binary at \`${babelPath}\`.
`
    );
};

const createReleaseFolderStructure = () => {
    return new Promise( ( resolve, reject ) => {
        mkdirp( join( rootPath, 'release' ), ( err ) => {
            if ( err ) {
                console.error( err );

                return;
            }

            const walker = walk( srcPath );

            walker.on( 'directory', ( root, stats, next ) =>
                new Promise( ( resolve, reject ) => {
                    const dirPath = join( root, stats.name );
                    const relativePath = dirPath.substring( srcPath.length );
                    const combinedReleasePath = join( releasePath, relativePath );

                    mkdirp( combinedReleasePath, ( err ) => resolve( releasePath ) );
                } ).then( next, next )
            );

            walker.on( 'end', () => {
                console.log( '    ● Created the release folder structure; proceeding with transpilation…' );
                console.log( '' );
                
                resolve( true );
            } );
        } );
    } );
};

const transpileFiles = () => {
    const walker = walk( srcPath );

    walker.on( 'file', ( root, stats, next ) => {
        const name = stats.name;

        if ( !name.toLowerCase().endsWith( '.js') ) { return next(); }

        const inFile = join( root, name );
        const relativePath = inFile.substring( srcPath.length );
        const outFile = join( releasePath, relativePath );

        let command = spawn(
            babelPath, [ '--source-maps', '--out-file', outFile, inFile ]
        );

        command.stdout.on('end', () => {
            console.log( `    ✓ ${outFile}` );
        } );

        next();
    } );
};

/**
 *
 */
const transpile = () => createReleaseFolderStructure().then( transpileFiles );

exports.initialize = initialize;
exports.transpile = transpile;
