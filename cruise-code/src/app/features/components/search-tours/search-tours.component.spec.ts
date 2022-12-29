import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToursComponent } from './search-tours.component';

describe('SearchToursComponent', () => {
  let component: SearchToursComponent;
  let fixture: ComponentFixture<SearchToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchToursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
