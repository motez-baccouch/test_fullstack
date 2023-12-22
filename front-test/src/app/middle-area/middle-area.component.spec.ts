import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleAreaComponent } from './middle-area.component';

describe('MiddleAreaComponent', () => {
  let component: MiddleAreaComponent;
  let fixture: ComponentFixture<MiddleAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiddleAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiddleAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
