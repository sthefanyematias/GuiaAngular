import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Excluir } from './excluir';

describe('Excluir', () => {
  let component: Excluir;
  let fixture: ComponentFixture<Excluir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Excluir]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Excluir);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
