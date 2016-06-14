```
 ____    __    ____  ____  __   
(  _ \  /__\  (  _ \(_  _)(  )  
 ) _ < /(__)\  ) _ < _)(_  )(__ 
(____/(__)(__)(____/(____)(____)
```

## Summary

`babil` is a helper module that transpiles your dependencies.

## Preamble

Currently you can do what `babil` can do [with a simple `babel` command when you set things up correctly](https://github.com/jsbites/babil/issues/30). So this is more like an **experimental** projects that wraps around `babel`.

So putting something like…

```
  "scripts": {
    …
    "build": "babel lib --source-maps -d release"
  },
```

in your `package.json` is a leaner option than using `babil`.

That said,

```
babil.initialize().then(babil.transpile)
```

does not look that bad either.

If you have any recommendations and thoughts, [feel free to create an issue](https://github.com/jsbites/babil/issues/new).

## Requirements

I haven’t checked; though I’m sure you’ll need a recent version of Node.JS (> 5.x.x) because it’s using modern JavaScript syntax.

Feel free to create a PR to make it backwards-compatible.

## Usage Example

First install `babil` via `npm`:

```
npm install babil --save-dev
```

Then use it in your scripts:

```
#!/usr/bin/env node

// file: PROJECT_ROOT/bin/transpile.js

var babil = require( 'babil' );
var transpile = babil.transpile;
var ROOT_PATH = require( 'path' ).join( __dirname, '..' );

//
// Assuming that `babel-cli` is “locally” installed in `PROJECT_ROOT/node_modules`
// the following call transpiles all JS files inside `PROJECT_ROOT/lib`,
// into `PROJECT_ROOT/release`. 
// It adds source maps to help debugging, too.
//
babil
    .initialize( { rootPath: ROOT_PATH } )
    .then( transpile );
```

This module is in its early alpha stage; so feel free to [add your comments and suggestions by creating an issue][ticket].

## About This Repository

This repository is a part of [Byte-Sized JavaScript Bi-Weekly VideoCast][vidcast].

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

It is a compilation of short (*more or less five minutes long*) bi-weekly screencasts about **JavaScript** and related technologies.

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
