import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRecipe} from "../models/IRecipe";

const RECIPES_TAGS_URL = "https://dummyjson.com/recipes/tags";
@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) {

  }
  getTags$(): Observable<string[]> {
    return this.http.get<string[]>(RECIPES_TAGS_URL)
  }
}
