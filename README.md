# get-clean-string

Simple and fast NPM module to clean up character strings by removing the special characters it might contain and by replacing any accents for its ascii equivalents. The module also accepts custom separators and custom replacements (see documentation below)

It doesn't have any external dependencies.

## Install

You can install with [npm]:

```sh
$ npm install --save get-clean-string
```
## Usage

The module needs to be initialized when importing:

```js

const clean = require('get-clean-string')()

```

Then it requires only the string to be cleaned as an argument:

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