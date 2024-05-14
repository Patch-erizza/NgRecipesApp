import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesMainPageComponent } from './recipes-main-page.component';

describe('RecipesMainPageComponent', () => {
  let component: RecipesMainPageComponent;
  let fixture: ComponentFixture<RecipesMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesMainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
