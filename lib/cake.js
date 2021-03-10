class Cake {
  constructor(ingredients) {
    this.ingredients = ingredients;
    this.finishedCake = null;
  }

  makeCake() {
    this.ingredients.getAllTheIngredients()
      .then(() => {
        this.finishedCake = 'Delicious cake!';
      })
      .catch(() => {
        this.finishedCake = 'Mud pie';
      });
  }
}

module.exports = Cake;
