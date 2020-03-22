/**
 * @fileoverview Rule to replace the lodash map method to native JavaScript map method
 * @author Daniil Egortsev
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/map');
const { RuleTester } = require('eslint');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

ruleTester.run('map', rule, {
  valid: [
    '[1, 2, 3, 4, 5, 6].map(function(smth) { console.log(smth) })',
    '_.map({ a: 1, b: 2, c: 3 }, smth => console.log(smth))',
    'Array.isArray(collection) ? collection.map(smth => console.log(smth)) : _.map(collection, smth => console.log(smth))',
    `if (Array.isArray(collection)) {
        collection.map(smth => console.log(smth));
    } else {
        _.map(collection, smth => console.log(smth));
    }`,
    `_ = () => {return 0;}
      (collection)=> { _.map(collection, smth) }`
  ],
  invalid: [
    {
      code: '_.map([1, 2, 3, 4], smth => console.log(smth))',
      output: '[1, 2, 3, 4].map(smth => console.log(smth))',
      errors: [
        {
          messageId: 'useNative'
        }
      ]
    },
    {
      code: '_.map(collection, smth => console.log(smth))',
      output:
        'Array.isArray(collection) ? collection.map(smth => console.log(smth)) : _.map(collection, smth => console.log(smth))',
      errors: [
        {
          messageId: 'useNative'
        }
      ]
    },
    {
      code: 'if (anyCondition) {_.map(collection, smth => console.log(smth));}',
      output:
        'if (anyCondition) {Array.isArray(collection) ? collection.map(smth => console.log(smth)) : _.map(collection, smth => console.log(smth));}',
      errors: [
        {
          messageId: 'useNative'
        }
      ]
    },
    {
      code: '{ property: _.map(collection, smth => console.log(smth)); }',
      output:
        '{ property: Array.isArray(collection) ? collection.map(smth => console.log(smth)) : _.map(collection, smth => console.log(smth)); }',
      errors: [
        {
          messageId: 'useNative'
        }
      ]
    },
    {
      code: '(collection) => { _.map(collection, smth) }',
      output:
        '(collection) => { Array.isArray(collection) ? collection.map(smth) : _.map(collection, smth) }',
      errors: [
        {
          messageId: 'useNative'
        }
      ]
    }
  ]
});
