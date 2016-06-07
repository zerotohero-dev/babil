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
const access = require( 'fs' ).access;
const R_OK = require( 'fs' ).R_OK;

const version = require( '../package.json' ).version;

let rootPath = join( __dirname, '..' );
let srcPath = '';
let releasePath = '';
let babelPath = '';
let babelWorkingDirectory = '';

const checkAccess = ( modulePath, moduleName ) =>
    new Promise( ( resolve, reject ) =>
        access( modulePath, R_OK , ( err ) => {
            if ( err ) {
                console.error( `
  ❢
  ❢ !!! ERROR !!!
  ❢
  ❢ Cannot find \`${moduleName}\`:
  ❢     The file \`${modulePath}\`
  ❢     either does not exist, or is unreadable.
  ❢     Are you sure you have “${moduleName}” there?
  ❢`);
                if ( moduleName === '.babelrc' ) {
                    console.error( `  ❢     Hint: At your project root, use…
  ❢
  ❢         echo '{ "presets": ["es2015"] }' > .babelrc
  ❢
  ❢     to create your .babelrc file.
  ❢`
                    );
                } else {
                    console.error( `  ❢
  ❢     Hint: Doing an \`npm install ${moduleName} --save-dev\` sometimes helps ;)
  ❢`
                    );
                }

                console.error( `  ❢ I am exiting right now.
  ❢ I cannot proceed until I find \`${moduleName}\`.
  ❢`
            );

            reject( false );

            return;
        }

        resolve( true );
    } )
);

/**
 *
 */
const initialize = ( config ) => {
    let {
        srcPath:src,
        releasePath:release,
        babelPath:babel,
        babelWorkingDirectory:bwd,
        rootPath:root
    } = config;

    // if ( !root ) {
    //     throw new Error( 'Please provide a root path.' );
    // }

    rootPath = root;
    srcPath = src || join( root, 'lib' );
    releasePath = release || join( root, 'release' );

    // TODO: search all the node_modules folders in the parent directories too.
    babelPath = babel || join( root, 'node_modules/babel-cli/bin/babel.js' );
    babelWorkingDirectory = bwd || join( babelPath, '../../../..' );

    console.log(
        `     ____    __    ____  ____  __
    (  _ \\  /__\\  (  _ \\(_  _)(  )
     ) _ < /(__)\\  ) _ < _)(_  )(__
    (____/(__)(__)(____/(____)(____) (v.${version})
————————————————————————————————————————————————————————————————————————————————
  ● Will transpile the files…
     from: \`${srcPath}\`,
       to: \`${releasePath}\`,
    using: the \`babel\` binary at \`${babelPath}\`.`
    );

    return Promise.all( [
        checkAccess( babelPath, 'babel-cli' ),
        checkAccess( join(babelWorkingDirectory, '.babelrc'), '.babelrc' )
    ] );
};

const createReleaseFolderStructure = () => {
    return new Promise( ( resolve ) => {
        const promises = [];

        mkdirp( releasePath, ( err ) => {
            if ( err ) {
                console.error( err );

                return;
            }

            console.log( `  ● (Re)created the release folder: “${releasePath}”.` );

            const walker = walk( srcPath );

            walker.on( 'directory', ( root, stats, next ) =>
                promises.push( new Promise( ( resolve ) => {
                    const dirPath = join( root, stats.name );
                    const relativePath = dirPath.substring( srcPath.length );
                    const combinedReleasePath = join( releasePath, relativePath );

                    mkdirp( combinedReleasePath, ( err ) => resolve( releasePath ) );

                    next();
                } ) )
            );

            walker.on( 'end', () => {
                console.log( '  ● Created the release folder structure; proceeding with transpilation.' );

                resolve( Promise.all( promises ) );
            } );
        } );
    } );
};

const transpileFiles = () => {
    const promises = [];
    const walker = walk( srcPath );

    console.log( '  ● Transpiling…' );

    walker.on( 'file', ( root, stats, next ) => {
        const name = stats.name;

        if ( !name.toLowerCase().endsWith( '.js') ) { return next(); }

        promises.push(new Promise( (resolve ) => {
            const inFile = join( root, name );
            const relativePath = inFile.substring( srcPath.length );
            const outFile = join( releasePath, relativePath );

            console.log( babelWorkingDirectory );
            console.log( babelPath );

            let command = spawn(
                babelPath, [ '--source-maps', '--presets', 'es2015', '--out-file', outFile, inFile ],
                { cwd: babelWorkingDirectory }
            );

            command.stdout.on( 'data', ( data ) => {
                console.log( data.toString() );
            } );

            command.stderr.on( 'data', ( data ) => {
                console.log( data.toString() );
            } );

            command.stdout.on( 'end', () => {
                console.log( `    ✓ ${outFile}` );
                resolve( true );
            } );



            next();
        } ) );
    } );

    walker.on( 'end', () =>
        Promise.all( promises ).then( () =>
            console.log(
                `  ● :) All done! (:
————————————————————————————————————————————————————————————————————————————————
`
            )
        )
    );
};

/**
 *
 */
const transpile = () => createReleaseFolderStructure().then( transpileFiles );

exports.initialize = initialize;
exports.transpile = transpile;
