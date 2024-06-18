import {Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatOption
} from "@angular/material/autocomplete";
import {async, map, Observable, startWith} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-and-remove-tags',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddAndRemoveTagsComponent),
    multi: true
  }],
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocomplete,
    MatOption,
    NgForOf,
    AsyncPipe,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  templateUrl: './add-and-remove-tags.component.html',
  styleUrl: './add-and-remove-tags.component.css'
})
export class AddAndRemoveTagsComponent implements ControlValueAccessor {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  autocompleteCtrl: FormControl<string | null> = new FormControl<string>(""); //===fruitCtrl
  // @ts-ignore
  filteredTags$: Observable<string[]>; //===filteredFruits
  selectedTags: string[] = []; //===fruits


  // @ts-ignore
  @Input() tags: string[] = []; //===allFruits
  @Input() placeholder: string = '';
  // @ts-ignore
  onChange = (_: any) => {};
  onTouched = () => {};
  // @ts-ignore
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  constructor() {

    this.filteredTags$ = this.autocompleteCtrl.valueChanges.pipe(
      startWith(null),
      map((inputText: string| null) => {
        if (inputText) {
          const allTags = this.tags;
          return allTags?.length ? allTags.filter((tag) => {
            const filterValue = inputText.toLowerCase();
            const tagName = tag.toLowerCase();
            return tagName.includes(filterValue);
          }) : allTags;
        }
        return [];
      })
    )
  }

  remove(tag: string) {
    const indexOfTag = this.selectedTags.indexOf(tag);
    if(indexOfTag >= 0) {
      this.selectedTags.splice(indexOfTag, 1);
      this.onChange(this.selectedTags)
    }

  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.selectedTags.push(event.option.viewValue);
    this.onChange(this.selectedTags);
    this.tagInput.nativeElement.value = '';
    this.autocompleteCtrl.setValue(null);
  }

  writeValue(tags: string[] = []) {
    console.log(tags)
    this.selectedTags = tags;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
