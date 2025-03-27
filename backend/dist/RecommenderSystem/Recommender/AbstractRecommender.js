"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractRecommender {
  constructor() {
    if (new.target === AbstractRecommender) {
      throw new Error("Cannot instantiate an abstract class directly");
    } else {
      this.updateAlgorithm();
    }
  }
  recommend() {
    throw new Error("Method 'recommend()' must be implemented.");
  }
  updateAlgorithm() {
    throw new Error("Method 'updateAlgorithm()' must be implemented.");
  }
}
exports.default = AbstractRecommender;
