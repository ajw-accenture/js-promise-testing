const Ingredients = require('./ingredients');
const Cake = require('./cake');

jest.mock('./ingredients');

describe('Cake tests', () => {
  let ingredients;
  let cake;

  let capturedThenFn;
  let capturedCatchFn;

  beforeEach(() => {
    const mockGetAllTheIngredients = jest.fn().mockImplementation(() => {
      const promiseLike = {
        then: (thenFn) => {
          capturedThenFn = thenFn;
          return promiseLike;
        },
        catch: (catchFn) => {
          capturedCatchFn = catchFn;
          return promiseLike;
        }
      };

      return promiseLike;
    });

    Ingredients.mockImplementation(() => {
      const ingredientLike = {
        getAllTheIngredients: mockGetAllTheIngredients
      }

      return ingredientLike;
    });

    ingredients = new Ingredients();
    cake = new Cake(ingredients);
  });


  describe('when there are ingredients', () => {
    it('should make cake', () => {
      cake.makeCake();

      capturedThenFn();

      expect(cake.finishedCake).toBe('Delicious cake!');
    });
  });
});
