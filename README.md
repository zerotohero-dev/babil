# babil

```
 ____    __    ____  ____  __   
(  _ \  /__\  (  _ \(_  _)(  )  
)  _ < /(__)\ )  _ < _)(_  )(__ 
(____/(__)(__)(____/(____)(____)
```

## Summary

`babil` is a helper module that transpiles your dependencies.

## Requirements

I haven’t checked; though I’m sure you’ll need a recent version of Node.JS (5.x.x) because it’s using modern JavaScript syntax.

Feel free to create a PR to make it backwards-compatible.

## Usage Example

First install `babil` via `npm`:

```
npm install babil --save-dev
```

Then use it in your scripts:

```
// PROJECT_ROOT/bin/transpile.js

const babil = require( 'babil' );
const join = require( 'path' ).join;

babil.initialize( {
    srcPath: join( __dirname, 'lib' ),
    rootPath: join( __dirname, '..',
    babelPath: join( __dirname, '../node_modules/babel-cli/bin/babel.js' )
} );

// Transpiles all JS files inside `PROJECT_ROOT/lib`,
// into `PROJECT_ROOT/release` and adds source maps too.
babil.transpile();
```

This module is in its early alpha stage; so feel free to [add your comments and suggestions by creating an issue][ticket]

## About This Repository

This repository is a part of [Byte-Sized JavaScript Weekly VideoCast][vidcast].

```
  _               __
 |_)   _|_  _ __ (_  o _   _   _|
 |_) \/ |_ (/_   __) | /_ (/__(_|
     /        |  _.     _. (_   _ ._ o ._ _|_
            \_| (_| \/ (_| __) (_ |  | |_) |_
                                       |
            »»  bit.ly/bytesized  ««
```

## Byte-Sized What?!

[Byte-Sized JavaScript][vidcast].

It is a compilation of short (*less than five minutes*) weekly screencasts about **JavaScript** and related technologies.

## Contact Information

* **Project Owner**: [Volkan Özçelik](mailto:me@volkan.io)
* **Project Website**: <https://volkan.io>

## License

MIT-licensed. — See [the license file](LICENSE.md) for details.

## Code of Conduct

We, as the community behind this project, are committed to making participation in this project a harassment-free experience for everyone, regardless of the level of expertise, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion or nationality.

[See the code of conduct](CODE_OF_CONDUCT.md) for more details.

[vidcast]: https://www.youtube.com/channel/UC8OLZSlFO8cwRo9M30v-TkA
[ticket]: https://github.com/jsbites/babil/issues/new
