import {Component, Input} from '@angular/core';
import {IRecipe} from "../../models/IRecipe";
import {MatCardImage, MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {async, firstValueFrom} from "rxjs";
import {NgForOf} from "@angular/common";
import {MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {RecipeCreateEditComponent} from "../recipe-create-edit/recipe-create-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {RecipeService} from "../../services/recipe.service.service";
import {IEditCreateRecipeDialogData} from "../../models/IEditCreateRecipeDialogData";
import {RecipeDeleteComponent} from "../recipe-delete/recipe-delete.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatCardImage, MatChipsModule, NgForOf, MatLabel, MatIcon],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {

  constructor(public dialog: MatDialog,
              public recipesService: RecipeService,
              private snackBar: MatSnackBar) {
  }
  // @ts-ignore
  @Input() recipe: IRecipe;

  async openDialogAddRecipe() {
    this.dialog.open(RecipeCreateEditComponent, {
      minWidth: "500px",
      data: this.recipe
    })
  }
openDialogDeleteRecipe(){
    const dialogRef = this.dialog.open(RecipeDeleteComponent, {
      width: "250px"
    });
    dialogRef.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.deleteRecipe();
      }
    })
  }
  private async deleteRecipe() {
    const delRecipe$ = this.recipesService.deleteRecipe$(this.recipe.id);
    await firstValueFrom(delRecipe$)
    this.openSnackBar();
  }
  openSnackBar() {
    this.snackBar.open("Recipe be delete!", "",{duration: 3000})
  }
}
