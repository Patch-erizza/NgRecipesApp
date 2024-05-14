import {Component, Inject, OnInit} from '@angular/core';
import {RecipesListComponent} from "../recipes-list/recipes-list.component";
import {AsyncPipe, JsonPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {combineLatest, map, Observable, publishReplay, refCount, startWith} from "rxjs";
import {IRecipe} from "../../models/IRecipe";
import {RecipeService} from "../../services/recipe.service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, ReactiveFormsModule, FormsModule, FormBuilder, FormGroup} from "@angular/forms";
import {RecipesSort} from "../../Enums/recipes-sort";
import {TagsService} from "../../services/tags.service";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatChipGrid, MatChipRow, MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {RecipeCreateEditComponent} from "../recipe-create-edit/recipe-create-edit.component";
import {MatButtonModule} from "@angular/material/button";
import {Dialog, DIALOG_DATA, DialogModule} from "@angular/cdk/dialog";
import {AddAndRemoveTagsComponent} from "../add-and-remove-tags/add-and-remove-tags.component";
import {MatDialog} from "@angular/material/dialog";

const RECIPES_SORT_OPTIONS = {
  [RecipesSort.Rating]: "Rating",
  [RecipesSort.ReviewCount]: "Review count",
  [RecipesSort.CookTimeMinutes]: "Cook Time Minutes",
  [RecipesSort.Difficulty]: "Difficulty",
  [RecipesSort.CaloriesPerServing]: "Calories"
}

@Component({
  selector: 'app-recipes-main-page',
  standalone: true,
  imports: [
    RecipesListComponent,
    NgIf,
    AsyncPipe,
    JsonPipe,
    NgForOf,
    KeyValuePipe,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    MatInput,
    MatChipGrid,
    MatChipRow,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    RecipeCreateEditComponent,
    MatButtonModule,
    DialogModule,
    AddAndRemoveTagsComponent
  ],
  templateUrl: './recipes-main-page.component.html',
  styleUrl: './recipes-main-page.component.css'
})
export class RecipesMainPageComponent implements OnInit {

  // form: FormGroup;

  searchQueryControl: FormControl<string | null> = new FormControl<string>("");
  addAndRemoveTagsControl: FormControl<any> = new FormControl<any>([]);
  selectAddSortIngredients: FormControl<string[] | null> = new FormControl<string[]>([]);
  selectExcludeSortIngredients: FormControl<string[] | null> = new FormControl<string[]>([]);

  selectSortControl: FormControl = new FormControl<"" | RecipesSort>("");
  recipesSortOptions = RECIPES_SORT_OPTIONS;


  constructor(private recipesService: RecipeService,
              private tagsService: TagsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              public dialog: MatDialog) {

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
  }

  // @ts-ignore
  recipes$: Observable<IRecipe[]>;
  // @ts-ignore
  tags$: Observable<string[]>;
  // @ts-ignore
  ingredients$: Observable<string[]>;

  // newRecipe: IRecipe;

  ngOnInit() {

    // this.form = this.fb.group({
    //   tags: []
    // });

    this.searchQueryControl.valueChanges.subscribe((searchRecipes) => {
      if (!searchRecipes) {
        this.router.navigate([], {queryParams: {search: null}, queryParamsHandling: "merge"})
      } else {
        this.router.navigate([], {queryParams: {search: searchRecipes}, queryParamsHandling: "merge"})
      }
    })

    this.selectSortControl.valueChanges.subscribe((sortParam) => {
      if (!sortParam) {
        this.router.navigate([], {queryParams: {sort: null}, queryParamsHandling: "merge"})
      } else {
        this.router.navigate([], {queryParams: {sort: sortParam}, queryParamsHandling: "merge"})
      }
    })

    this.addAndRemoveTagsControl.valueChanges.subscribe((selectTags) => {
      if (!selectTags) {
        this.router.navigate([], {queryParams: {selectTags: null}, queryParamsHandling: "merge"})
      } else {
        this.router.navigate([], {queryParams: {selectTags: selectTags}, queryParamsHandling: "merge"})
      }
    })

    this.selectAddSortIngredients.valueChanges.subscribe((addIngredients) => {
      if (!addIngredients) {
        this.router.navigate([], {queryParams: {addIngredients: null}, queryParamsHandling: "merge"})
      } else {
        this.router.navigate([], {queryParams: {addIngredients: addIngredients}, queryParamsHandling: "merge"})
      }
    })
    this.selectExcludeSortIngredients.valueChanges.subscribe((excludeIngredients) => {
      if (!excludeIngredients) {
        this.router.navigate([], {queryParams: {excludeIngredients: null}, queryParamsHandling: "merge"})
      } else {
        this.router.navigate([], {queryParams: {excludeIngredients: excludeIngredients}, queryParamsHandling: "merge"})
      }
    })


    const searchQueryParam$ = this.activatedRoute.queryParams.pipe(
      map((queryParams) => {
        return queryParams["search"];
      }),
      startWith("")
    )
    searchQueryParam$.subscribe((searchQuery) => {
      this.searchQueryControl.setValue(searchQuery, {emitEvent: false})
    })

    const sortQueryParam$ = this.activatedRoute.queryParams.pipe(
      map((queryParams) => {
        return queryParams["sort"]
      }),
      startWith("")
    )
    sortQueryParam$.subscribe((sortParam) => {
      this.selectSortControl.setValue(sortParam, {emitEvent: false})
    })

    const selectTagsQueryParams$ = this.activatedRoute.queryParams.pipe(
      map((queryParams) => {
        return queryParams["selectTags"]
      }),
      startWith([])
    )
    selectTagsQueryParams$.subscribe((selectTags) => {
      this.addAndRemoveTagsControl.setValue(selectTags, {emitEvent: false})
    })


    const addIngredientsQueryParams$ = this.activatedRoute.queryParams.pipe(
      map((queryParams) => {
        return queryParams["addIngredients"]
      }),
      startWith([])
    )
    addIngredientsQueryParams$.subscribe((addIngredients) => {
      this.selectAddSortIngredients.setValue(addIngredients, {emitEvent: false})
    })
    const excludeIngredientsQueryParams$ = this.activatedRoute.queryParams.pipe(
      map((queryParams) => {
        return queryParams["excludeIngredients"]
      }),
      startWith([])
    )
    excludeIngredientsQueryParams$.subscribe((excludeIngredients) => {
      this.selectExcludeSortIngredients.setValue(excludeIngredients, {emitEvent: false})
    })


    const allRecipes$ = this.recipesService.getRecipes$();
    // const allTags$ = this.tagsService.getTags$();
    // const allIngredients$ = this.recipes$
    //     .pipe(
    //       map(recipes => {
    //         const ingredients = recipes.reduce((accumulator, recipe) => {
    //           return [...accumulator,...recipe.ingredients]
    //         }, [] as string[]);
    //
    //         const uniqueValuesSet =
    //           new Set(ingredients);
    //
    //         return Array.from(uniqueValuesSet);
    //       })
    //     )
    this.recipes$ = combineLatest([
      allRecipes$,
      searchQueryParam$,
      sortQueryParam$,
      selectTagsQueryParams$,
      addIngredientsQueryParams$,
      excludeIngredientsQueryParams$])
      .pipe(
        map((
          [allRecipes,
            searchQuery,
            sortQuery,
            selectTagsQuery,
            addIngredientsQuery,
            excludeIngredientsQuery]) => {
          const recipesFilteredBySearchQuery = searchQuery ? allRecipes.filter((recipe) => {
            const lowerCasedSearchQuery = searchQuery.toLowerCase();
            const recipeName = recipe.name.toLowerCase();
            const foundInName = recipeName.includes(lowerCasedSearchQuery);
            return foundInName;
          }) : allRecipes;

          const sortedRecipes = sortQuery ? [...recipesFilteredBySearchQuery].sort((a, b) => {
            // @ts-ignore
            const aSortField = a[sortQuery];
            // @ts-ignore
            const bSortField = b[sortQuery];
            return aSortField - bSortField;
          }) : recipesFilteredBySearchQuery;


          const recipesFilteredBySelectedTags = selectTagsQuery?.length ? sortedRecipes.filter((recipe) => {
            console.log(selectTagsQuery)
            const recipeTags = recipe.tags;
            console.log(recipeTags)
            for (const selectTag of selectTagsQuery) {
              console.log(selectTag)
              const foundInTags = recipeTags.includes(selectTag);
              if (!foundInTags) {
                return false;
              }
            }
            return true;
          }) : sortedRecipes;

          const recipesFilteredByAddQuery = addIngredientsQuery?.length ? recipesFilteredBySelectedTags.filter((recipe) => {
            const recipeAddIngredients = recipe.ingredients;
            for (const selectIngredient of addIngredientsQuery) {
              const foundInIngredients = recipeAddIngredients.includes(selectIngredient);
              if (!foundInIngredients) {
                return false;
              }
            }
            return true;
          }) : recipesFilteredBySelectedTags;

          const recipesFilteredByExcludeQuery = excludeIngredientsQuery?.length ? recipesFilteredByAddQuery.filter((recipe) => {
            const recipeExcludeIngredients = recipe.ingredients;
            for (const selectIngredient of excludeIngredientsQuery) {
              const foundInIngredients = recipeExcludeIngredients.includes(selectIngredient);
              if (foundInIngredients) {
                return false;
              }
            }
            return true;
          }) : recipesFilteredByAddQuery;
          return recipesFilteredByExcludeQuery;
        })
      )
  }

  openDialogAddRecipe() {
    const dialogRef = this.dialog.open(RecipeCreateEditComponent, {
      minWidth: "500px",
    })
  }
}
