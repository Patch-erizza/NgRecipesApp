import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IRecipe} from "../models/IRecipe";
import {IRecipesSearchResult} from "../models/IRecipesSearchResult";
import {IRecipeCreateEditFormData} from "../models/IRecipeCreateEditFormData";

const RECIPES_URL = "http://localhost:3000/recipes";
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {

  }
  getRecipes$(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(RECIPES_URL)
  }
  createRecipe$(recipe: IRecipeCreateEditFormData) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<IRecipeCreateEditFormData>(RECIPES_URL, JSON.stringify(recipe), {headers: myHeaders});
  }

  updateRecipe$(recipe: IRecipeCreateEditFormData) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.patch<IRecipeCreateEditFormData>(RECIPES_URL + "/" + recipe.id, JSON.stringify(recipe), {headers: myHeaders});
  }
  deleteRecipe$(id: number) {
    return this.http.delete(RECIPES_URL + "/" + id);
  }

  getOneRecipe$(id: number) {
    return this.http.get<IRecipe>(RECIPES_URL + "/" + id)
  }
}
