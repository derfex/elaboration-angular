import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptinessComponent } from './emptiness.component';

describe('EmptinessComponent', () => {
  let component: EmptinessComponent;
  let fixture: ComponentFixture<EmptinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmptinessComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
