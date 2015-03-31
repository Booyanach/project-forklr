var wordsObj = function () {
    this.words = [
        '<preposition>', '<firstname>', '<activity>', '<adj>',
        '<adv>', '<amount>', '<color>', '<conj>', '<country>',
        '<emo>', '<em>', '<face>', '<greet>', '<surname>', '<noun>',
        '<sound>', '<title>', '<place>', '<prefix>', '<prepos>',
        '<pron>', '<quality>', '<rel>', '<sconj>', '<substance>',
        '<timeadv>', '<timenoun>', '<unit>', '<verbimg>', '<say>',
        '<verb>', '<vocal>', '<yn>'
    ];
};

wordsObj.prototype.get = function () {
    return this.words[this.item()];
};

wordsObj.prototype.list = function () {
    return this.words;
};

wordsObj.prototype.item = function () {
    return Math.floor(Math.random() * this.size());
};


wordsObj.prototype.size = function () {
    return this.words.length - 1;
};

wordsObj.prototype.generateString = function () {
    var returnVal = '', self = this;
    for (var i = 0; i < 5; i++) {
        returnVal += ' ' + self.get();
    }
    return returnVal;
};

module.exports = new wordsObj();