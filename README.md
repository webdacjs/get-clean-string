# get-clean-string

Simple and fast NPM module to clean up character strings by removing the special characters it might contain and by replacing any accents for its ascii equivalents. The module also accepts custom separators and custom replacements (see documentation below)

It doesn't have any external dependencies.

## Install

You can install with [npm]:

```sh
$ npm install --save get-clean-string
```
## Usage

The module requires just one argument: The string to be cleaned.

```js

// Example1: Sorting the countries by the name

const clean = require('get-clean-string');
clean(' remove these: !@#$%^&^*&() ')

// Returns
'remove these'

```

Nevertheless it's possible to define a custom separator

```js

const clean = require('get-clean-string');
clean(' remove these: !@#$%^&^*&() ', '-')

//Returns
'remove-these'

```

A third parameter (an object defining the custom replacements needed) can be used as well.

```js

const clean = require('get-clean-string');
clean(' remove these: !@#$%^&^*&() ', '-', {o: '0'})

//Returns
'rem0ve these'
```


### Running tests

Run the tests and check the functionality of this module using:

```sh
$ npm run test
```

### License

Copyright © 2019, [Juan Convers](https://juanconvers.com).
Released under the [MIT License](LICENSE).