import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualboardComponent } from './visualboard.component';

describe('VisualboardComponent', () => {
  let component: VisualboardComponent;
  let fixture: ComponentFixture<VisualboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
