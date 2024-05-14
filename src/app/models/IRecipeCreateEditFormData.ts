export interface IRecipeCreateEditFormData {
  id?: number | null,
  name: string | null,
  ingredients: string[] | null,
  instructions: string[] | null,
  prepTimeMinutes: number | null,
  cookTimeMinutes: number | null,
  servings: number | null, //количество порций
  difficulty: string | null, //сложность
  cuisine?: string | null, //вид кухни
  caloriesPerServing: number | null,
  tags: string[] | null,
  userId?: number | null,
  image: string | null,
  rating?: number | null,
  reviewCount?: number | null, //число просмотров (популярость)
  mealType?: string[] | null //тип приема пищи (завтрак, обед, ужин)
}
