import {Component, Input} from '@angular/core';
import {RecipeCardComponent} from "../recipe-card/recipe-card.component";
import {JsonPipe, NgForOf} from "@angular/common";
import {IRecipe} from "../../models/IRecipe";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    RecipeCardComponent,
    NgForOf,
    JsonPipe,
    MatButtonToggle,
    MatButton
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent {

  @Input() recipeList: IRecipe[] = [];
}
