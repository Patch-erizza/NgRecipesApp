// import {ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {RecipeCreateEditComponent} from './recipe-create-edit.component';
// import {DebugElement} from "@angular/core";
// import {By} from "@angular/platform-browser";
// import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
// import {RecipeService} from "../../services/recipe.service.service";
// import {TagsService} from "../../services/tags.service";
// import {HttpClientTestingModule} from "@angular/common/http/testing";
// import {of} from "rxjs";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
//
// describe('RecipeCreateEditComponent', () => {
//   let component: RecipeCreateEditComponent;
//   let fixture: ComponentFixture<RecipeCreateEditComponent>;
//   let debugElement: DebugElement;
//   let htmlElement: HTMLElement;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RecipeCreateEditComponent,
//         HttpClientTestingModule,
//         BrowserAnimationsModule
//       ],
//       providers: [
//         {provide: MAT_DIALOG_DATA, useValue: {}},
//         {provide: MatDialogRef, useValue: {}},
//         {
//           provide: RecipeService, useValue: {
//             getRecipes$: () => of([])
//           }
//         },
//         {
//           provide: TagsService, useValue: {
//             getTags$: () => of([])
//           }
//         },
//       ]
//     })
//
//     fixture = TestBed.createComponent(RecipeCreateEditComponent);
//     component = fixture.componentInstance;
//     debugElement = fixture.debugElement.query(By.css('mat-dialog-actions'));
//     htmlElement = debugElement.nativeElement;
//   });
//
//   it('should display button', () => {
//     fixture.detectChanges();
//     expect(htmlElement).toBeTruthy();
//   });
//
// });
