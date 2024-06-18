import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from "../../services/recipe.service.service";
import {IRecipe} from "../../models/IRecipe";
import {TagsService} from "../../services/tags.service";
import {MatCardImage} from "@angular/material/card";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink, RouterModule} from "@angular/router";
import {map, Observable, pipe, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-one-recipe-page',
  standalone: true,
  imports: [
    MatCardImage,
    MatChip,
    MatChipSet,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './one-recipe-page.component.html',
  styleUrl: './one-recipe-page.component.css'
})
export class OneRecipePageComponent implements OnInit {

  constructor(public recipesService: RecipeService,
              public tagsService: TagsService,
              private activatedRoute: ActivatedRoute) {
  }
  // @ts-ignore
  recipe$: Observable<IRecipe>;

  ngOnInit() {

    const idParam$ = this.activatedRoute.params.pipe(
      map((queryParam) => {
        return queryParam["id"];
      }),
    )
    this.recipe$ = idParam$.pipe(
      switchMap((id) => this.recipesService.getOneRecipe$(id))
    )
  }
}
