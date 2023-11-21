import { TestBed } from '@angular/core/testing';

import { ServicesUsuario } from './services-usuario.service';

describe('ServicesUsuarioService', () => {
  let service: ServicesUsuario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesUsuario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
