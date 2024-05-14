import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {RecipeService} from "../../services/recipe.service.service";
import {RecipeCreateEditComponent} from "../recipe-create-edit/recipe-create-edit.component";

@Component({
  selector: 'app-recipe-delete',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './recipe-delete.component.html',
  styleUrl: './recipe-delete.component.css'
})
export class RecipeDeleteComponent {
  constructor() {
  }
}
