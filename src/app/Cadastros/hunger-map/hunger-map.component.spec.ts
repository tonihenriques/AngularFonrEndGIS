import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HungerMapComponent } from './hunger-map.component';

describe('HungerMapComponent', () => {
  let component: HungerMapComponent;
  let fixture: ComponentFixture<HungerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HungerMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HungerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
