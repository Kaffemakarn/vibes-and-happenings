declare global {
  interface String {
    toUpperCaseLetters(nbrOfLetters?: number): string;
  }
}

if (!String.prototype.toUpperCaseLetters) {
  String.prototype.toUpperCaseLetters = function (nbrOfLetters = 1) {
    return this.substring(0, nbrOfLetters).toUpperCase() + this.substring(nbrOfLetters).toLowerCase();
  };
}

export {};
