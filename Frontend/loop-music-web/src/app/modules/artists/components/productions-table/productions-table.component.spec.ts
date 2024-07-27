import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionsTableComponent } from './productions-table.component';

describe('ProductionsTableComponent', () => {
  let component: ProductionsTableComponent;
  let fixture: ComponentFixture<ProductionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
