import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRolesComponent } from './cadastro-roles.component';

describe('CadastroRolesComponent', () => {
  let component: CadastroRolesComponent;
  let fixture: ComponentFixture<CadastroRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
