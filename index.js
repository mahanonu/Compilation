const Lexer = require('./Lexer');
const Parser = require('./Parser');
const Parserv2 = require('./Parserv2');

const src = '2 + ( 7 - 2 ) + 4 * 5';
const tokens = new Lexer().parse(src);
const ast = new Parser().parser(tokens);
const ast2 = new Parserv2().parser(tokens);

console.log(src);
console.log(ast);
console.log(ast2);