class Ingredients {
  constructor(should_blow_up) {
    this.should_blow_up = should_blow_up;
  }

  getAllTheIngredients() {
    return new Promise((resolve, reject) => {
      if (this.should_blow_up) {
        reject('I blew up!');
      }
      else {
        resolve('Here are the ingredients.');
      }
    });
  }
}

module.exports = Ingredients;
