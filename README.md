# eslint-plugin-lodash-to-native

Rule to replace the lodash map method to native JavaScript map method

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-lodash-to-native`:

```
$ npm install -S github.com/playhardgopro/eslint-plugin-lodash-to-native.git
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-lodash-to-native` globally.

## Usage

Add `lodash-to-native` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["lodash-to-native"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "lodash-to-native/map": ["warn", { "preferTernar": true }]
  }
}
```

## Supported Rules

- map
