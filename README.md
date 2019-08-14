# get-clean-string

Module to clean a string, removing special characters and replacing accents for ascii equivalents. It accepts custom separators and custom replacements (see documentation below)

## Install

You can install with [npm]:

```sh
$ npm install --save get-clean-string
```
## Usage

The module requires just the string to be cleaned to work.

```js

// Example1: Sorting the countries by the name

const clean = require('get-clean-string');
clean(' remove these: !@#$%^&^*&() ')

// Returns
'remove these'

```

Nevertheless you can define a custom separator

```js

const clean = require('get-clean-string');
clean(' remove these: !@#$%^&^*&() ', '-')

//Returns
'remove-these'

```

You can pass a third parameter with an object defining custom replacements. For example if you want to change the o by 0s

```js

const clean = require('get-clean-string');
clean(' remove these: !@#$%^&^*&() ', '-', {o: '0'})

//Returns
'rem0ve these'
```


### Running tests

You can run the tests and check the functionality of this module using:

```sh
$ npm run test
```

### License

Copyright © 2019, [Juan Convers](https://juanconvers.com).
Released under the [MIT License](LICENSE).