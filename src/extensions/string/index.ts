interface String {
    /**
     * Make sure that string extensions has imported;
     *
     *
     */
    toCamelCase(): string;
}

String.prototype.toCamelCase = function () {
    return this.split(' ')
        .map((word) => word[0].toUpperCase().concat(word.toLowerCase().slice(1)))
        .join(' ');
};
