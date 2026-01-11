import { Listar } from './../../component/listar/listar';
import { Excluir } from './../../component/excluir/excluir';
import { Consultar } from './../../component/consultar/consultar';
import { Cadastrar } from './../../component/cadastrar/cadastrar';
import { Principal } from './../../pages/principal/principal';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', component: Principal, title: 'Farmácia' },
    { path: 'cadastrar', component: Cadastrar, title: 'Cadastrar' },
    { path: 'consultar', component: Consultar, title: 'Consultar' },
    { path: 'excluir', component: Excluir, title: 'Excluir' },
    { path: 'listar', component: Listar, title: 'Listar' },
    { path: '**', redirectTo: '' }]