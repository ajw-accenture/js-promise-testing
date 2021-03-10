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
      const promiseLookalike = {
        then: (thenFn) => {
          capturedThenFn = thenFn;
          return promiseLookalike;
        },
        catch: (catchFn) => {
          capturedCatchFn = catchFn;
          return promiseLookalike;
        }
      };

      return promiseLookalike;
    });

    Ingredients.mockImplementation(() => {
      const ingredientClassLookalike = {
        getAllTheIngredients: mockGetAllTheIngredients
      }

      return ingredientClassLookalike;
    });

    ingredients = new Ingredients();
    cake = new Cake(ingredients);
  });

  describe('when there are ingredients', () => {
    it('should make delicious cake', () => {
      cake.makeCake();

      capturedThenFn();

      expect(cake.finishedCake).toBe('Delicious cake!');
    });
  });

  describe('when there are no ingredients', () => {
    it('should make mud pie', () => {
      cake.makeCake();

      capturedCatchFn();

      expect(cake.finishedCake).toBe('Mud pie');
    });
  });
});
