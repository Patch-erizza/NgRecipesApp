export interface IRecipe {
  id: number,
  name: string,
  ingredients: string[],
  instructions: string[],
  prepTimeMinutes: number,
  cookTimeMinutes: number,
  servings: number, //количество порций
  difficulty: string, //сложность
  cuisine: string, //вид кухни
  caloriesPerServing: number,
  tags: string[],
  userId: number,
  image: string,
  rating: number,
  reviewCount: number, //число просмотров (популярость)
  mealType: string[] //тип приема пищи (завтрак, обед, ужин)
}
