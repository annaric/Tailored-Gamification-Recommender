class AbstractRecommender {
  constructor() {
    if (new.target === AbstractRecommender) {
      throw new Error("Cannot instantiate an abstract class directly");
    }
  }

  // Abstract method (must be implemented by derived classes)
  recommend() {
    throw new Error("Method 'recommend()' must be implemented.");
  }

  updateAlgorithm() {
    throw new Error("Method 'updateAlgorithm()' must be implemented.");
  }
}

module.exports = AbstractRecommender;
