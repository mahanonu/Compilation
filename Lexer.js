const Tokentype = require('./TokenType');
const Token = require('./Token');

class Lexer {

    constructor() {
        this._src = "";
        this._cursor = 0;
        this._currentword = "";
        this._tokens = [];
    }

    get current(){
        return this._src[this._cursor];
    }

    consume(){
        this._currentword += this.current;
        this._cursor ++;
    }

    cleanCurrentWord(){
        this._currentword = "";
    }
    produce(type){
        this._tokens.push(new Token(type,this._currentword));
        this.cleanCurrentWord();
    }

    testDigit(){
        if("0123456789".includes(this.current)) return true;
        return false;
    }

    parseNumber(){
        if (!this.testDigit()) return false;
        while(this.testDigit()){
            this.consume();
        }
        this.produce(Tokentype.NUMBER);
        return true;
    }

    testSymbol_plus(){
        if("+".includes(this.current)) return true;
        return false;
    }

    testSymbol_minus(){
        if("-".includes(this.current)) return true;
        return false;
    }

    testSymbol_times(){
        if("*".includes(this.current)) return true;
        return false;
    }
    
    testSymbol_divide(){
        if("/".includes(this.current)) return true;
        return false;
    }

    testSymbol_percent(){
        if("%".includes(this.current)) return true;
        return false;
    }
    
    testSymbol_open_par(){
        if("(".includes(this.current)) return true;
        return false;
    }

    testSymbol_close_par(){
        if(")".includes(this.current)) return true;
        return false;
    }
    
    parseSymbol(){
        if(this.testSymbol_plus()) {
            this.consume();
            this.produce(Tokentype.SYMBOL_PLUS);
            return true;
        } else if(this.testSymbol_minus()) {
            this.consume();
            this.produce(Tokentype.SYMBOL_MINUS);
            return true;
        } else if(this.testSymbol_times()) {
            this.consume();
            this.produce(Tokentype.SYMBOL_TIMES);
            return true;
        } else if(this.testSymbol_divide()) {
            this.consume();
            this.produce(Tokentype.SYMBOL_DIVIDE);
            return true;
        } else if(this.testSymbol_percent()) {
            this.consume();
            this.produce(Tokentype.SYMBOL_PERCENT);
            return true;
        } else if(this.testSymbol_open_par()) {
            this.consume();
            this.produce(Tokentype.SYMBOL_OPEN_PAR);
            return true;
        } else if(this.testSymbol_close_par()) {
            this.consume();
            this.produce(Tokentype.SYMBOL_CLOSE_PAR);
            return true;
        }
        return false;
    }

    testSpace(){
        if (" \t\n\l\r\0".includes(this.current)) return true;
        return false;
    }

    avoidSpace(){
        while(this.testSpace()){
            this.consume();
            this.cleanCurrentWord();
        }
        return this.current != undefined;
    }

    parse(src){
        this._src = src;
        while(this.parseNumber() || this.parseSymbol() || this.avoidSpace()){

        };
        this._currentWord = 'eof'
		this.produce(Tokentype.EOF)
        return this._tokens;
    }
}

module.exports = Lexer;
