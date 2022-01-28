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

	calc(symbol){
		let right = this._pile.pop();
		let left = this._pile.pop();
		let res = eval(left+symbol+right);
		this._pile.push(res);
	}

    parserA(){
        if (this._tokens[this._cursor]._type.includes("NUMBER") || this._tokens[this._cursor]._type.includes("OPEN") ){
            this.parserB();
        }
        if (this._tokens[this._cursor]._type.includes("PLUS") || this._tokens[this._cursor]._type.includes("MINUS")){
            let symbol = this._tokens[this._cursor]._name;
            this._cursor++;
            this.parserA();
            this.calc(symbol);
        } 
    return true;
    }
	
    parserB(){
        if (this._tokens[this._cursor]._type.includes("NUMBER") || this._tokens[this._cursor]._type.includes("OPEN")){
            this.parserC();
        }
        if (this._tokens[this._cursor]._type.includes("TIMES") || this._tokens[this._cursor]._type.includes("DIVIDE")){
            let symbol = this._tokens[this._cursor]._name;
            this._cursor++;
            this.parserB();
            this.calc(symbol);
        }
    }


    parserC(){
        if (this._tokens[this._cursor]._type.includes("NUMBER")){
            this.parsenumber();
            this.parserA();
        } else if (this._tokens[this._cursor]._type.includes("OPEN")){
            this._cursor++;
            this.parserA();
                if (this._tokens[this._cursor]._type.includes("CLOSE")){
                this._cursor++;
                }
        } else {
            return true;
        }
    
    }
    
}


module.exports = Parser;