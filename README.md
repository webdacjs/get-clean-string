# get-clean-string

Simple and fast NPM module to clean up character strings by removing the special characters it might contain and by replacing any accents for its ascii equivalents. The module also accepts custom separators and custom replacements (see documentation below)

It doesn't have any external dependencies for the core library. Only dependencies on typescript for ts support and tsup for efficient bundling.

## Install

You can install with [npm]:

```sh
$ npm install --save get-clean-string
```
## Import

The module needs to be initialized when importing:

```js

const clean = require('get-clean-string')()

```

NOTE: Don't forget to call it '()' when importing. Otherwise the clean function will always return:

```js
[Function]
```

## Usage


The module requires only the string to be cleaned as a parameter:

```js

clean(' remove these: !@#$%^&^*&() ')

// Returns
'remove these'

```

It's possible to define a custom separator

```js

clean(' remove these: !@#$%^&^*&() ', '-')

//Returns
'remove-these'

```

A third parameter (an object defining the custom replacements needed) can be used as well.

```js

clean(' remove these: !@#$%^&^*&() ', '-', {o: '0'})

//Returns
'rem0ve-these'
```

The second and third parameter can be applied globally when importing the module, so they apply everytime a clean operation is performed:

```js

const clean = require('get-clean-string')('-', {o: '0'})
clean(' remove these: !@#$%^&^*&() ')
clean(' remove those: !@#$%^&^*&() ')

//Returns
'rem0ve-these'
'rem0ve-th0se'
```

### Running tests

Run the tests and check the functionality of this module using:

```sh
$ npm run test
```

### License

Copyright © 2019, [Juan Convers](https://juanconvers.com).
Released under the [MIT License](LICENSE).