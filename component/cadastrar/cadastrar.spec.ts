import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cadastrar } from './cadastrar';

describe('Cadastrar', () => {
  let component: Cadastrar;
  let fixture: ComponentFixture<Cadastrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cadastrar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cadastrar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
