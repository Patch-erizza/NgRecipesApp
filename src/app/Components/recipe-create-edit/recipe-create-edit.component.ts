import {Component, Inject, Input} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatChipSet} from "@angular/material/chips";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import {IRecipe} from "../../models/IRecipe";
import {IEditCreateRecipeDialogData} from "../../models/IEditCreateRecipeDialogData";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  ValidationErrors
} from "@angular/forms";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {AddAndRemoveTagsComponent} from "../add-and-remove-tags/add-and-remove-tags.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {firstValueFrom, map, Observable} from "rxjs";
import {TagsService} from "../../services/tags.service";
import {MatIcon} from "@angular/material/icon";
import {MatDrawerContainer} from "@angular/material/sidenav";
import {RecipeService} from "../../services/recipe.service.service";
import {IRecipeCreateEditFormData} from "../../models/IRecipeCreateEditFormData";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SaveRecipeComponent} from "../save-recipe/save-recipe.component";
import {arrayMinLengthValidator} from "../../Validators/array-min-length.validator";


@Component({
  selector: 'app-recipe-create-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipSet,
    NgxMatFileInputModule,
    MatDialogContent,
    ReactiveFormsModule,
    FormsModule,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatButtonModule,
    AddAndRemoveTagsComponent,
    AsyncPipe,
    NgIf,
    MatIcon,
    MatDrawerContainer
  ],
  templateUrl: './recipe-create-edit.component.html',
  styleUrl: './recipe-create-edit.component.css'
})

// нужно получить введенный пользователем текст
// записать значение в новую карточку рецепта
//
//
//
export class RecipeCreateEditComponent {

  createAndEditForm = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    name: new FormControl<string>("",
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern('[a-zA-Z/s]*')
      ]),
    difficulty: new FormControl<string>(""),
    servings: new FormControl<number>(0),
    prepTimeMinutes: new FormControl<number>(0),
    cookTimeMinutes: new FormControl<number>(0),
    caloriesPerServing: new FormControl<number>(0),
    ingredients: new FormControl<string[]>([], [arrayMinLengthValidator(1)]),
    instructions: new FormControl<string[]>([], [Validators.required, Validators.maxLength(65535)]),
    image: new FormControl<any>(null),
    tags: new FormControl<any>([], [arrayMinLengthValidator(1)])
  });
  // @ts-ignore
  editedRecipe: IRecipe;
  recipes$: Observable<IRecipe[]>
  // @ts-ignore
  tags$: Observable<string[]>;
  // @ts-ignore
  ingredients$: Observable<string[]>;


  constructor(@Inject(MAT_DIALOG_DATA)
              public data: IRecipe,
              public dialogRef: MatDialogRef<RecipeCreateEditComponent>,
              public recipesService: RecipeService,
              private tagsService: TagsService,
              private snackBar: MatSnackBar) {
    this.recipes$ = this.recipesService.getRecipes$();
    this.tags$ = this.tagsService.getTags$();
    this.ingredients$ = this.recipes$
      .pipe(
        map(recipes => {
          const ingredients = recipes.reduce((accumulator, recipe) => {
            return [...accumulator, ...recipe.ingredients]
          }, [] as string[]);

          const uniqueValuesSet =
            new Set(ingredients);

          return Array.from(uniqueValuesSet);
        })
      )
    // @ts-ignore
    if (data) {
      this.createAndEditForm.get("id")?.setValue(data.id);
      this.createAndEditForm.get("name")?.setValue(data.name);
      this.createAndEditForm.get("difficulty")?.setValue(data.difficulty);
      this.createAndEditForm.get("servings")?.setValue(data.servings);
      this.createAndEditForm.get("prepTimeMinutes")?.setValue(data.prepTimeMinutes);
      this.createAndEditForm.get("cookTimeMinutes")?.setValue(data.cookTimeMinutes);
      this.createAndEditForm.get("caloriesPerServing")?.setValue(data.caloriesPerServing);
      this.createAndEditForm.get("ingredients")?.setValue(data.ingredients);
      this.createAndEditForm.get("instructions")?.setValue(data.instructions);
      this.createAndEditForm.get("image")?.setValue(data.image);
      this.createAndEditForm.get("tags")?.setValue(data.tags);
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async addAndUpdateRecipe() {
    try {
      const formData = this.createAndEditForm.value;
      if (this.data) {
        const updateRecipe$ = this.recipesService.updateRecipe$(formData as IRecipeCreateEditFormData);
        await firstValueFrom(updateRecipe$);
      } else {
        const newRecipe$ = this.recipesService.createRecipe$(formData as IRecipeCreateEditFormData);
        await firstValueFrom(newRecipe$);
      }
      this.openSnackBar();
      this.dialogRef.close();
    } catch (err) {
      this.errorSnackBar();
    }
  }

  openSnackBar() {
    this.snackBar.open("Recipe be saved!", "", {duration: 3000})
  }
  errorSnackBar() {
    this.snackBar.open("Something went wrong!", "", {duration: 5000})
  }
}
