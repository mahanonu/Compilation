const Lexer = require('./Lexer');


class Parser {

	constructor() {
		this._tokens = null;
		this._ast = null;
		this._cursor = 0;
		this._pile = [];
	}

	parser(tokens) {
		this._tokens = tokens;
		this.parserA();
		this._ast = this._pile.pop();
		return this._ast;
	}

	parsenumber(){
		this._pile.push(parseInt(this._tokens[this._cursor]._name));
		this._cursor++;
	}

	parsesymbol(){
		let symbol = this._tokens[this._cursor].name;
		this._cursor++;
		return symbol;
	}

	calcsymbol(symbol){
		let right = this._pile.pop();
		let left = this._pile.pop();
		let res = eval(left+symbol+right);
		this._pile.push(res);
	}

	parserA(){
		if (this._tokens[this._cursor]._type == 'NUMBER'){
			this.parsenumber();
			this.parserB();
		} else if (this._tokens[this._cursor]._type == 'SYMBOL_OPEN_PAR'){
			this._cursor++;
			this.parserA();
			this.parserB();
		}else {
			return true;
		}
	}

	parserB() {
		if (this._tokens[this._cursor] == undefined){
			return true;
		}
		else if (this._tokens[this._cursor]._type == 'SYMBOL_CLOSE_PAR'){
			this._cursor++;
		} else if (this._tokens[this._cursor]._type.includes('SYMBOL')){
			let symbol = this.parsesymbol();
			this.parserA();
			this.calcsymbol(symbol);
		} else {
			return true;
		}			
	}
}

module.exports = Parser;