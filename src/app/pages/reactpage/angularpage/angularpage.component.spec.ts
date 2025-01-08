import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularpageComponent } from './angularpage.component';

describe('AngularpageComponent', () => {
  let component: AngularpageComponent;
  let fixture: ComponentFixture<AngularpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
