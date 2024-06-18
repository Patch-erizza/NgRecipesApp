import { Routes } from '@angular/router';
import {RecipesMainPageComponent} from "./Components/recipes-main-page/recipes-main-page.component";
import {OneRecipePageComponent} from "./Components/one-recipe-page/one-recipe-page.component";

export const routes: Routes = [
  {
    path: "",
    component: RecipesMainPageComponent
  },
  {
    path: "recipe/:id",
    component: OneRecipePageComponent
  }
];
