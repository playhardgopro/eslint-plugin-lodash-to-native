/**
 * @fileoverview Array.map
 * @author Daniil Egortsev
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Array.map',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        context.report({
          node,
          message: 'Use native JavaScript methods',

          fix(fixer) {
            if (Array.isArray(node.arguments[0])) {
              // Can't auto-fix template literal with expressions
              return;
            }

            return [
              fixer.replaceTextRange([node.start, node.start + 1], '"'),
              fixer.replaceTextRange([node.end - 1, node.end], '"')
            ];
          }
        });
      }

      // give me methods
    };
  }
};
