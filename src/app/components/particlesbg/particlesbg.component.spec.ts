import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticlesbgComponent } from './particlesbg.component';

describe('ParticlesbgComponent', () => {
  let component: ParticlesbgComponent;
  let fixture: ComponentFixture<ParticlesbgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticlesbgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticlesbgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
