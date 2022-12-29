import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourInventoryListComponent } from './tour-inventory-list.component';

describe('TourInventoryListComponent', () => {
  let component: TourInventoryListComponent;
  let fixture: ComponentFixture<TourInventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourInventoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
