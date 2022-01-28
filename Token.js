class Token {

    get type(){
        return this._type;
    }

    get name(){
        return this._name;
    }

    constructor(type,name){
        this._type = type;
        this._name = name;   
    }
}

module.exports = Token;