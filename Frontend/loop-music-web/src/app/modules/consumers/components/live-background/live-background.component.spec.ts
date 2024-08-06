import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveBackgroundComponent } from './live-background.component';

describe('LiveBackgroundComponent', () => {
  let component: LiveBackgroundComponent;
  let fixture: ComponentFixture<LiveBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveBackgroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
