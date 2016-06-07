#!/usr/bin/env node

const babil = require( '../../..' );
const transpile = babil.transpile;
const join = require( 'path' ).join;

const ROOT_PATH = join( __dirname, '..' );

babil.initialize( {

    //
    // Since the paths are not in their default location we need to specify these paths.
    // Note that `releasePath` is computed off of `rootPath`, if not given separately.
    //
    // For a non-default setup it is best to specify `babelPath`, `srcPath`, and `releasePath`
    // as shown below:
    //
    babelPath: join( ROOT_PATH, '../../node_modules/babel-cli/bin/babel.js' ),
    srcPath: join( ROOT_PATH, 'generators/app/lib' ),
    releasePath: join( ROOT_PATH, 'generators/app/release' )
    //
    // If the above three options are specified properly, you won’t need to specify a `rootPath`
    // Though specifying one won’t hurt either:
    //
    // rootPath: ROOT_PATH,
    //
    // ### You **Must** Provide a `.babelrc` In Your `babelWorkingDirectory`
    //
    // Babel and all preset need to be under the same `node_modules` folder, to cooperate without pain.
    //
    // Also, providing a `.babelrc` file inside the babel working directory is the best
    // (and the most hassle-free (and, at times, bug-free) way to interop with babel.
    //
    // If not provided, babel working directory will be computed off of the `babelPath` assuming that 
    // babel is installed locally (which is the recommended way, strongly encouraged in the Babel documentation)
    // 
    // If you want to explicitly provide this option for some reason, make sure that your `.babelrc` is
    // a direct child of `babelWorkingDirectory` as in…
    //
    // babelWorkingDirectory: join( ROOT_PATH, '../..' )
    //
    // ### Additional Notes:
    // 
    // Babel is “really” opionated on where things should be.
    // For instance, unlike many other Node.JS modules, it won’t do a recursive lookup for its dependencies.
    // It will assume the dependencies to exist in certain locations 
    // (i.e., inside the `node_modules` folder of the current project).
    // 
    // Additionally, Babel **strongly suggest** `babel-cli` to be installed inside the very same `node_modules`
    // folder under the current project too.
    //
    // Trying to convince `babel` work otherwise is an uphill battle, not worth fighting for.
    //
} )
.then( transpile );
