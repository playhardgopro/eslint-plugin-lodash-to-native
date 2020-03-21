/**
 * @fileoverview Rule to replace the lodash map method to native JavaScript map method
 * @author Daniil Egortsev
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Replace the lodash map method to the native javascript method',
      category: 'ECMAScript 6',
      recommended: false
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          preferTernar: {
            type: 'boolean',
            default: true
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      useNative: 'Use native map method instead of lodash map'
    }
  },

  create(context) {
    const rule = Object.assign({}, context.options[0]);
    rule.preferTernar = rule.preferTernar !== false;
    const sourceCode = context.getSourceCode();

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression: node => {
        const firstArgumentNode = node.arguments[0];
        const firstArgumentName = node.arguments[0].name;
        const secondArgumentNode = node.arguments[1];

        if (
          node.callee.type == 'MemberExpression' &&
          node.callee.object.name === '_' &&
          node.callee.property.name === 'map'
        ) {
          if (firstArgumentNode.type === 'ObjectExpression') {
            return '';
          }

          const sourceText = sourceCode.getText(node);
          const mapCallback = sourceCode.getText(secondArgumentNode);
          const ancestors = context.getAncestors(node);
          const condition = `Array.isArray(${firstArgumentName})`;

          const isArrayCondition = ancestors.some(
            parent =>
              (parent.type === 'IfStatement' ||
                parent.type === 'ConditionalExpression') &&
              sourceCode.getText(parent.test) === condition
          );

          if (isArrayCondition) {
            return '';
          }

          if (firstArgumentNode.type === 'ArrayExpression') {
            context.report({
              node,
              messageId: 'useNative',
              fix(fixer) {
                return fixer.replaceText(
                  node,
                  `${sourceCode.getText(firstArgumentNode)}.map(${mapCallback})`
                );
              }
            });

            return '';
          }

          const ternarCode = `${condition} ? ${firstArgumentName}.map(${mapCallback}) : ${sourceText}`;
          const ifElseCode = `if (${condition}) {
            ${firstArgumentName}.map(${mapCallback});
          } else {
            ${sourceText};
          }`;

          const result = rule.preferTernar ? ternarCode : ifElseCode;

          context.report({
            node,
            messageId: 'useNative',
            fix(fixer) {
              return fixer.replaceText(node, result);
            }
          });
        }
      }
    };
  }
};
