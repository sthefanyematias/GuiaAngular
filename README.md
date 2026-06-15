
# Guia Prático: Sistema de Gerenciamento de Farmácia | Angular & Node.js

Este documento detalha os passos para configurar o ambiente de desenvolvimento e iniciar um projeto simples que demonstra a integração entre Node.js, Angular, TypeScript e JSON Server (simulação de API). O desenvolvimento será realizado utilizando a IDE **Visual Studio Code (VS Code)**.

**Objetivo do Guia:** criar um site simples de gerenciamento para uma farmácia, utilizando Angular e alguns conceitos básicos, como o consumo de dados de uma API simulada, demonstrando a importância de cada recurso na pilha de desenvolvimento.

# Recursos Necessários (Instalação) 

Seu projeto Angular precisa de algumas ferramentas baseadas em Node.js para funcionar corretamente.

### 1. Node.js e NPM (Node Package Manager)

### 2. Angular CLI (Command Line Interface)

### 3. TypeScript

### 4. JSON-Server (Simulação de API)

<br>

# Criação da Aplicação Angular

Com o ambiente configurado, siga os passos para criar sua primeira aplicação.

## 1. Criar o Projeto

Use o Angular CLI para criar um novo projeto. Abra o terminal (Ex.: No Windows, **Win + R > digite "cmd" > Enter**) e execute o comando:

```bash
ng new farmacia
```

Durante a criação do projeto, o Angular CLI fará algumas perguntas. Responda da seguinte forma:

* **Which stylesheet format would you like to use?**
    * Resposta sugerida: `CSS`
* **Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)?**
    * Resposta sugerida: `N`
* **Do you want to create a 'zoneless' application without zone.js?**
    * Resposta sugerida: `N`
* **Which AI tools do you want to configure with Angular best practices?
https://angular.dev/ai/develop-with-ai (Press <space> to select, <a> to
toggle all, <i> to invert selection, and <enter> to proceed)**
    * Resposta sugerida: `None`

## 2. Acesso à Pasta do Projeto

Após a conclusão da instalação, acesse a pasta recém-criada do projeto:

```bash
cd farmacia
```

## 3. Criação de Componentes e Estrutura de Pastas

Dentro da pasta do projeto (`farmacia`), crie a estrutura de pastas essencial e os componentes necessários, seguindo os comandos no terminal:

1.  **Crie a pasta `data` (para o JSON do JSON-Server):**
    ```bash
    mkdir data
    ```
    * **Ainda no prompt, digite:**
        ```bash
        cd data
        ```
        e em seguida, crie o arquivo JSON:
        ```bash
        type nul>farmacia.json
        ```
    * Agora, saia da pasta atual e volte para a pasta `farmacia`:
        ```bash
        cd..
        ```

2.  **Crie a pasta `pages` (para as páginas principais/rotas) e gere seus componentes:**

    ```bash
    mkdir pages
    ```

    * **Ainda no prompt, digite:**
        ```bash
        cd pages
        ```
    * Em seguida, gere os componentes das páginas principais:
        ```bash
        ng g c cabecalho
        ```
        **ou** (caso o comando `ng` não seja reconhecido globalmente):
        ```bash
        npx ng g c cabecalho
        ```
        Provavelmente aparecerá uma mensagem solicitando o compartilhamento de dados anônimos. 

      * **Would you like to share pseudonymous usage data about this project with the Angular Team at Google under Google's Privacy Policy at https://policies.google.com/privacy. For more details and how to             change this setting, see https://angular.dev/cli/analytics.**
         * Resposta sugerida: `Yes`

    * Seguindo para a criação dos demais componentes principais da página:
        ```bash
        ng g c principal
        ```
        * Caso o comando não funcione, adicione `npx` à frente do código, assim como na etapa anterior (ex.: `npx ng g c principal`).

    * Seguindo:
        ```bash
        ng g c rodape
        ```

    * Retorne à pasta anterior (`farmacia`) com:
        ```bash
        cd..
        ```

3.  **Crie a pasta `component` (para componentes reutilizáveis) e seus componentes:**
    ```bash
    mkdir component
    ```
    * Entre na pasta:
        ```bash
        cd component
        ```
    * Agora, crie os componentes reutilizáveis (o componente `consultar` foi digitado duas vezes no seu original, mantive a sequência):
        ```bash
        ng g c cadastrar
        ```
        ```bash
        ng g c consultar
        ```
        ```bash
        ng g c excluir
        ```
        ```bash
        ng g c listar
        ```
    * Volte ao estágio anterior (`farmacia`):
        ```bash
        cd..
        ```

4.  **Crie a pasta `core` com as subpastas `services` e `types`:**
    A pasta `core/services` hospedará os serviços de API (como `MedicamentosService`), e `core/types` hospedará as definições de tipo (interface `Medicamento`).

    ```bash
    mkdir core\services core\types
    ```

### Criação dos Arquivos de Serviço e Tipos

Crie os seguintes arquivos dentro das pastas `core/services` e `core/types`, respectivamente:

* **Em `core/services`:**
    Entre na pasta:
    ```bash
    cd core\services
    ```
    Crie o arquivo do serviço:
    ```bash
    type nul>medicamentos.service.ts
    ```

* **Em `core/types`:**
    Volte para a pasta `core` (`cd..`) e entre em `types`:
    ```bash
    cd..
    ```
    
    Digite
    ```bash
    cd types
    ```
    
    Crie o arquivo de tipos:
    ```bash
    type nul>types.ts
    ```

* **Retornar à pasta raiz do projeto (`\farmacia`):**
    ```bash
    cd..\..
    ```

### Abrir o Projeto no VS Code

Com todas as pastas e seus respectivos arquivos criados, digite o comando para ser redirecionado para o VS Code:

```bash
code .
```

<br>

# No VS Code

#### 1. `app.component.ts` ou `app.ts`

Digite e faça as devidas atualizações para o caminho dos imports (que agora são relativos à pasta raiz do projeto, `app/`):

```typescript
import { RodapeComponent } from './../../pages/rodape/rodape.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from '../../pages/cabecalho/cabecalho.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabecalhoComponent, RodapeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Farmácia';
}
```

#### 2. `main.ts`

Digite o seguinte código:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; 
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig) 
  .catch((err) => console.error(err));
```

#### 2.1 `app.config.ts`

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient() 
  ]
};
```

> [!NOTE]
> **ATENÇÃO:** Este passo é crucial para habilitar o serviço HTTP (`HttpClient`).

#### 3. `app.component.html` ou `app.html`

Digite o seguinte código:

```html
<div class="page-container">
  <app-cabecalho></app-cabecalho>
  
  <main class="content-wrap">
    <router-outlet /> 
  </main>
  
  <app-rodape></app-rodape>
</div>
```

#### **4. `app.component.css` ou `app.css`**

Digite o seguinte código:

```css
.page-container {
    display: flex;
    flex-direction: column; 
    min-height: 100vh; 
    width: 100%;
}

.content-wrap {
    flex-grow: 1;}

app-cabecalho,
app-rodape {
    width: 100%;
}
```

#### **5. `index.html`**

Digite o seguinte código:

```html
<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <title>Farmácia</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" href="https://cdn-icons-png.flaticon.com/512/2966/2966327.png">
</head>
<body>
  <app-root></app-root>
</body>
</html>

```

#### **6. `app.routes.ts`**

Digite o seguinte código:

```typescript
import { PrincipalComponent } from './../../pages/principal/principal.component';
import { Routes } from '@angular/router';
import { CadastrarComponent } from '../../component/cadastrar/cadastrar.component';
import { ConsultarComponent } from '../../component/consultar/consultar.component';
import { ExcluirComponent } from '../../component/excluir/excluir.component';
import { ListarComponent } from '../../component/listar/listar.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent, title: 'Farmácia' },
  { path: 'cadastrar', component: CadastrarComponent, title: 'Cadastrar' },
  { path: 'consultar', component: ConsultarComponent, title: 'Consultar' },
  { path: 'excluir', component: ExcluirComponent, title: 'Excluir' },
  { path: 'listar', component: ListarComponent, title: 'Listar' },
  { path: '**', redirectTo: '' }]
```

#### **7. `data/farmacia.json`**

Digite o seguinte código:

```json
{
  "medicamentos": [
    {
      "id": "12045",
      "nome": "Cloridrato de Sertralina 50mg",
      "fabricante": "EMS",
      "data_fabricacao": "2024-01-20",
      "data_validade": "2026-07-20",
      "preco": 45.99
    },
    {
      "id": "78103",
      "nome": "AAS Infantil",
      "fabricante": "Bayer",
      "data_fabricacao": "2025-03-01",
      "data_validade": "2027-03-01",
      "preco": 5.75
    },
    {
      "id": "55290",
      "nome": "Lactulose 667mg/ml",
      "fabricante": "Medley",
      "data_fabricacao": "2024-04-15",
      "data_validade": "2026-04-15",
      "preco": 32.8
    },
    {
      "id": "81077",
      "nome": "Amoxicilina + Clavulanato",
      "fabricante": "Eurofarma",
      "data_fabricacao": "2024-07-28",
      "data_validade": "2025-11-28",
      "preco": 78.1
    },
    {
      "id": "34921",
      "nome": "Omeprazol 20mg",
      "fabricante": "Prati Donaduzzi",
      "data_fabricacao": "2023-11-05",
      "data_validade": "2025-05-05",
      "preco": 10.5
    },
    {
      "id": "62589",
      "nome": "Dipirona Monoidratada 500mg",
      "fabricante": "Cimed",
      "data_fabricacao": "2024-02-14",
      "data_validade": "2026-02-14",
      "preco": 12
    },
    {
      "id": "41108",
      "nome": "Probiótico Flora Intestinal",
      "fabricante": "Sanofi",
      "data_fabricacao": "2025-04-01",
      "data_validade": "2027-04-01",
      "preco": 59.9
    },
    {
      "id": "27643",
      "nome": "Cetirizina 10mg",
      "fabricante": "Genérico",
      "data_fabricacao": "2024-03-05",
      "data_validade": "2026-03-05",
      "preco": 22.45
    },
    {
      "id": "99015",
      "nome": "Neosaldina",
      "fabricante": "Takeda",
      "data_fabricacao": "2024-11-20",
      "data_validade": "2026-11-20",
      "preco": 19.99
    },
    {
      "id": "14698",
      "nome": "Cloridrato de Metformina 500mg",
      "fabricante": "Aché",
      "data_fabricacao": "2024-06-01",
      "data_validade": "2026-09-01",
      "preco": 8.15
    },
    {
      "id": "88301",
      "nome": "Solução Fisiológica 0,9%",
      "fabricante": "Farmace",
      "data_fabricacao": "2025-01-20",
      "data_validade": "2028-01-20",
      "preco": 6.9
    },
    {
      "id": "50674",
      "nome": "Diclofenaco Sódico Gel",
      "fabricante": "Catarinense",
      "data_fabricacao": "2024-05-18",
      "data_validade": "2026-05-18",
      "preco": 25.7
    },
    {
      "id": "39512",
      "nome": "Dramin B6",
      "fabricante": "Takeda",
      "data_fabricacao": "2024-12-05",
      "data_validade": "2026-12-05",
      "preco": 14.5
    }
  ]
}
```

#### 8. `core/types/types.ts`

Este arquivo define a estrutura de dados (interface) para o objeto **Medicamento**. Digite o seguinte código:

```typescript
export interface Medicamento {
  id: number;
  nome: string;
  fabricante: string;
  data_fabricacao: string; 
  data_validade: string;   
  preco: number; 
}
```

#### 9. `core/services/medicamentos.service.ts`

Digite e faça as **importações com os caminhos atualizados**. O código final deve ser o seguinte:

```typescript
import { Injectable } from '@angular/core';
import { Medicamento } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicamentosService {
  private readonly API = 'http://localhost:3000/medicamentos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.API);
  }

  incluir(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.API, medicamento);
  }

  excluir(id: number): Observable<Medicamento> {
    return this.http.delete<Medicamento>(`${this.API}/${id}`);
  }

  buscarPorId(id: number): Observable<Medicamento | undefined> {
    return this.http.get<Medicamento>(`${this.API}/${id}`);
  }

  editar(medicamento: Medicamento): Observable<Medicamento> {
    const url = `${this.API}/${medicamento.id}`
    return this.http.put<Medicamento>(url, medicamento)
  }
}
```

#### 10. `pages/cabecalho/cabecalho.component.html`

Digite o seguinte código:

```html
<header class="cabecalho-container">
    <div class="cabecalho-principal">
        <h1 class="titulo">Gerenciamento de Medicamentos</h1>
        <nav class="menu">
            <ul>
                <li><a routerLink="/principal" routerLinkActive="active">Home</a></li>
              <li><a routerLink="/cadastrar" routerLinkActive="active">Cadastrar</a></li>
              <li><a routerLink="/consultar" routerLinkActive="active">Consultar</a></li>
              <li><a routerLink="/excluir" routerLinkActive="active">Excluir</a></li>
              <li><a routerLink="/listar" routerLinkActive="active">Listar</a></li>
            </ul>
        </nav>
    </div>
</header>
```

#### 11. `pages/cabecalho/cabecalho.component.css`

Digite o seguinte código:

```css
:host {
    display: block;
    width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.cabecalho-container {
    background-color: #f7f7f7; 
    padding: 15px 0;
    border-bottom: 1px solid #e0e0e0;
}

.cabecalho-principal {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; 
    gap: 15px;
}

.titulo {
    font-size: 1.6rem;
    color: #333333; 
    margin: 0;
    font-weight: 500;
}

.menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 20px;
}

.menu a {
    color: #555555; 
    text-decoration: none;
    font-weight: 600;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.2s, color 0.2s;
}

.menu a:hover,
.menu a.active {
    background-color: #e6e6e6; 
    color: #333333;
}

@media (max-width: 768px) {
    .cabecalho-principal {
        flex-direction: column;
        text-align: center;
    }

    .menu ul {
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 10px;
        gap: 10px;
    }
}
```

#### 12. `pages/cabecalho/cabecalho.component.ts`

Digite o seguinte código:

```typescript
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {

}
```

#### 13. `pages/principal/principal.component.html`

Digite o seguinte código:

```html
<main class="principal">
  <div class="container">
    
    <div class="boas-vindas-simples">
      <h2>Bem-vindo(a) à Gestão de Medicamentos!</h2>
      <p>Gerencie o estoque da sua farmácia com rapidez, organização e praticidade.</p>
    </div>
    
    <section class="destaques">
      <div class="destaque-cards">
        <a class="card" routerLink="/listar">
          <i class="fas fa-list-alt"></i>
          <h3>Listar e Excluir</h3>
          <p>Visualize e remova medicamentos do inventário com segurança.</p>
        </a>

        <a class="card" routerLink="/cadastrar">
          <i class="fas fa-plus-square"></i>
          <h3>Cadastrar Novos</h3>
          <p>Adicione novos lotes e mantenha o estoque sempre atualizado.</p>
        </a>

        <a class="card" routerLink="/consultar">
          <i class="fas fa-search-plus"></i>
          <h3>Consultar Medicamentos</h3>
          <p>Busque por medicamentos específicos com facilidade.</p>
        </a>
      </div>
    </section>
  </div>
</main>
```

#### 14. `pages/principal/principal.component.css`

Digite o seguinte código:

```css
.principal {
  padding: 50px 0;
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: flex-start; 
}

.container {
  width: min(1100px, 94%);
  margin: 0 auto;
}

.boas-vindas-simples {
  text-align: center;
  padding: 0 0 40px 0; 
}

.boas-vindas-simples h2 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.4rem; 
  font-weight: 700;
}

.boas-vindas-simples p {
  color: #666;
  font-size: 1.15rem;
  margin-bottom: 0;
}

.destaque-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 260px;
  max-width: 320px;
  padding: 35px 25px;
  border-radius: 14px;
  background-color: #ffffff; 
  border: 1px solid #e3e6ea;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease, border-color 0.4s ease;
  cursor: pointer;
}

.card:hover h3,
.card:hover p,
.card:hover i {
    color: #ffffff; 
    filter: none; 
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(44, 62, 80, 0.15);
  background-color: #ffffff; 
}

.card:nth-child(1):hover {
  border-color: #3498db; 
  background-color: #3498db;
}

.card:nth-child(2):hover {
  border-color: #28a745; 
  background-color: #28a745;
}

.card:nth-child(3):hover {
  border-color: #ffc107; 
  background-color: #ffc107;
}

.card i {
  font-size: 2.8rem;
  margin-bottom: 18px;
  display: block;
  transition: color 0.3s ease;
}

.card:nth-child(1) i {
  color: #3498db;
}

.card:nth-child(2) i {
  color: #28a745; 
}

.card:nth-child(3) i {
  color: #ffc107; 
}

.card h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-weight: 600;
  font-size: 1.3rem;
}

.card p {
  font-size: 1rem;
  color: #777;
  margin: 0;
}

@media (max-width: 768px) {
  .boas-vindas-simples h2 {
    font-size: 1.8rem;
  }

  .card {
    min-width: 90%;
    max-width: 90%;
  }

  .destaque-cards {
    gap: 20px;
  }
}
```

#### 15. `pages/principal/principal.component.ts`

Digite o seguinte código:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
}
```

#### 16. `pages/rodape/rodape.component.html`

Digite o seguinte código:

```html
<footer class="rodape-container">
    <div class="rodape-conteudo">
        <p>&copy; {{ currentYear }} Gerenciamento de Farmácia. Todos os direitos reservados.</p>
    </div>
</footer>
```

#### 17. `pages/rodape/rodape.component.css`

Digite o seguinte código:

```css
.rodape-container {
    background-color: #333333; 
    color: #e0e0e0;
    padding: 15px 0;
    text-align: center;
    font-size: 0.9rem;
}

.rodape-conteudo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.rodape-conteudo p {
    margin: 5px 0;
}
```

#### 18. `pages/rodape/rodape.component.ts`

Digite o seguinte código:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent {
  currentYear: number = new Date().getFullYear();
}
```

#### 19. `component/cadastrar/cadastrar.component.html`

Digite o seguinte código:

```html
<div class="content-form-container">
    <h2>{{ titulo }}</h2>
    <form (ngSubmit)="submeter()">
      <div class="form-row">
        <div class="form-group">
          <label for="input-id">Id</label>
          <input
            class="input-simples"
            id="input-id"
            name="input-id"
            placeholder="Ex: 001"
            type="text"
            [(ngModel)]="medicamento.id"
            required
          />
        </div>
        <div class="form-group">
          <label for="input-nome">Nome</label>
          <input
            class="input-simples"
            id="input-nome"
            name="input-nome"
            placeholder="Ex: Paracetamol 500mg"
            type="text"
            [(ngModel)]="medicamento.nome"
            required
          />
        </div>
      </div>
      
      <label for="input-fabricante">Fabricante</label>
      <input
        class="input-simples"
        id="input-fabricante"
        name="input-fabricante"
        placeholder="Ex: Medley"
        type="text"
        [(ngModel)]="medicamento.fabricante"
        required
      />

      <div class="form-row">
        <div class="form-group">
          <label for="input-fabricacao">Data de Fabricação</label>
          <input
            class="input-simples"
            id="input-fabricacao"
            name="input-fabricacao"
            type="date"
            [(ngModel)]="medicamento.data_fabricacao"
            required
          />
        </div>
        <div class="form-group">
          <label for="input-validade">Data de Validade</label>
          <input
            class="input-simples"
            id="input-validade"
            name="input-validade"
            type="date"
            [(ngModel)]="medicamento.data_validade"
            required
          />
        </div>
      </div>

      <label for="input-preco">Preço (R$)</label>
      <input
        class="input-simples"
        id="input-preco"
        name="input-preco"
        placeholder="0.00"
        type="number"
        step="0.01"
        [(ngModel)]="medicamento.preco"
        required
      />

      <button type="submit" class="input-submeter">
        <i class="fas fa-save"></i> Cadastrar Medicamento
      </button>
    </form>

    <div *ngIf="medicamentoCadastrado" class="medicamento-dados sucesso-cadastro">
    <h3>Medicamento cadastrado com sucesso!</h3>
    <p><strong>Id:</strong> {{ medicamentoCadastrado.id }}</p>
    <p><strong>Nome:</strong> {{ medicamentoCadastrado.nome }}</p>
    <p><strong>Fabricante:</strong> {{ medicamentoCadastrado.fabricante }}</p>
    <p><strong>Data de Fabricação:</strong> {{ medicamentoCadastrado.data_fabricacao | date:'dd/MM/yyyy' }}</p>
    <p><strong>Validade:</strong> {{ medicamentoCadastrado.data_validade | date:'dd/MM/yyyy' }}</p>
    <p><strong>Preço:</strong> {{ medicamentoCadastrado.preco | currency:'BRL':'symbol':'1.2-2' }}</p>
</div>
</div>
```

#### 20. `component/cadastrar/cadastrar.component.css`

Digite o seguinte código:

```css
.content-form-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h2 {
    color: #444;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 10px;
    margin-bottom: 25px;
    font-weight: 500;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.form-group {
  flex: 1;
}

form label {
  display: block;
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
}

.input-simples {
  width: 100%;
  padding: 10px 12px;
  font-size: 1rem;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.input-simples:focus {
  border-color: #6c757d; 
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.25);
  outline: none;
}

.input-submeter {
  width: 100%;
  padding: 12px;
  margin-top: 25px;
  background-color: #28a745; 
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.input-submeter:hover {
  background-color: #218838;
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}

.medicamento-dados {
    margin-top: 30px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sucesso-cadastro {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724; 
}

.medicamento-dados h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #155724;
    font-weight: 600;
    font-size: 1.2rem;
}

.medicamento-dados p {
    margin: 5px 0;
    font-size: 0.95rem;
}

.medicamento-dados strong {
    color: #000;
}
```

#### 21. `component/cadastrar/cadastrar.component.ts`

Digite o seguinte código:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medicamento } from '../../core/types/types';
import { MedicamentosService } from '../../core/services/medicamentos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  titulo = 'Cadastro de Medicamentos';
  medicamento: Medicamento = {} as Medicamento;
  medicamentoCadastrado: Medicamento | null = null; 

  constructor(
    private service: MedicamentosService,
    private router: Router
  ) { }

  submeter() {
    this.medicamentoCadastrado = null;
    
    this.service.incluir(this.medicamento).subscribe({
        next: (response) => {
            this.medicamentoCadastrado = response;
            
            this.medicamento = {} as Medicamento; 

            console.log('Medicamento cadastrado:', response);
        },
        error: (err) => {
             console.error('Erro ao cadastrar medicamento:', err);
             alert('Falha ao cadastrar. Verifique a API.');
        }
    });
  }
}
```

#### 22. `component/consultar/consultar.component.html`

Digite o seguinte código:

```html
<div class="consulta-container">
    <h2>Consulta de Medicamento por Id</h2>
    <form (ngSubmit)="buscarMedicamento()">
      <label for="input-id">Informe o código de identificação do medicamento:</label>
      <input
        type="text"
        id="input-id"
        name="input-id"
        [(ngModel)]="idBusca"
        class="input-id"
        required
      />
      <button type="submit" class="btn-buscar">
        <i class="fas fa-search"></i> Buscar
    </button>
    </form>
  
    <div *ngIf="medicamentoEncontrado" class="medicamento-dados">
      <h3>Dados do Medicamento</h3>
      <p><strong>Id:</strong> {{ medicamentoEncontrado.id }}</p>
      <p><strong>Nome:</strong> {{ medicamentoEncontrado.nome }}</p>
      <p><strong>Fabricante:</strong> {{ medicamentoEncontrado.fabricante }}</p>
      <p><strong>Data de Fabricação:</strong> {{ medicamentoEncontrado.data_fabricacao | date:'dd/MM/yyyy' }}</p>
      <p><strong>Validade:</strong> {{ medicamentoEncontrado.data_validade | date:'dd/MM/yyyy' }}</p>
      <p><strong>Preço:</strong> {{ medicamentoEncontrado.preco | currency:'BRL':'symbol':'1.2-2' }}</p>
    </div>
  
    <div *ngIf="erroBusca" class="erro-busca">
      <i class="fas fa-times-circle"></i> {{ erroBusca }}
    </div>
</div>
```

#### 23. `component/consultar/consultar.component.css`

Digite o seguinte código:

```css
.consulta-container {
    max-width: 500px;
    margin: 40px auto;
    padding: 25px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #444;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: 500;
}
  
form {
    display: flex;
    flex-direction: column;
}
  
.input-id {
    padding: 10px;
    margin-top: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
}
  
.btn-buscar {
    padding: 12px;
    background-color: #6c757d; 
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
}
  
.btn-buscar:hover {
    background-color: #5a6268;
}

.btn-buscar i {
    margin-right: 8px;
}
  
.medicamento-dados {
    margin-top: 30px;
    padding: 15px;
    background-color: #e9f5ff; 
    border: 1px solid #b3d4fc;
    border-radius: 6px;
}

.medicamento-dados h3 {
    color: #444;
    margin-top: 0;
    margin-bottom: 15px;
}
  
.erro-busca {
    margin-top: 20px;
    padding: 10px;
    background-color: #f8d7da; 
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    font-weight: 500;
}

.erro-busca i {
    margin-right: 5px;
}
```

#### 24. `component/consultar/consultar.component.ts`

Digite o seguinte código:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medicamento } from '../../core/types/types';
import { MedicamentosService } from '../../core/services/medicamentos.service';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css',
})
export class ConsultarComponent {
  idBusca: number | null = null; 
  medicamentoEncontrado: Medicamento | null = null; 
  erroBusca: string = ''; 
  constructor(private service: MedicamentosService) { }

  buscarMedicamento(): void {
    this.erroBusca = '';
    this.medicamentoEncontrado = null;

    if (this.idBusca) {
      this.service.buscarPorId(this.idBusca).subscribe({
        next: (medicamento) => {
          if (medicamento) {
            this.medicamentoEncontrado = medicamento;
          } else {
            this.erroBusca = `Medicamento com código ${this.idBusca} não encontrado.`;
          }
        },
        error: () => {
          this.erroBusca = 'Erro na comunicação com o servidor.';
        }
      });
    } else {
      this.erroBusca = 'Por favor, informe um código.';
    }
  }
}
```

#### 25. `component/excluir/excluir.component.html`

Digite o seguinte código:

```html
<div class="excluir-container">
    <h2>Exclusão de Medicamento</h2>
    
    <div class="alerta-perigo">
        <i class="fas fa-exclamation-triangle"></i>
        ATENÇÃO: A exclusão é irreversível.
    </div>

    <form (ngSubmit)="excluirMedicamento()">
      <label for="input-id">Informe o código de identificação para exclusão:</label>
      <input
        type="text"
        id="input-id"
        name="input-id"
        [(ngModel)]="idExcluir"
        class="input-id"
        required
      />
      <button type="submit" class="btn-excluir">
        <i class="fas fa-trash-alt"></i> Excluir Permanentemente
      </button>
    </form>
  
    <div *ngIf="mensagemSucesso" class="sucesso-mensagem">
      <i class="fas fa-check-circle"></i> {{ mensagemSucesso }}
    </div>
  
    <div *ngIf="erroMensagem" class="erro-mensagem">
      <i class="fas fa-times-circle"></i> {{ erroMensagem }}
    </div>
</div>
```

#### 26. `component/excluir/excluir.component.css`

Digite o seguinte código:

```css
.excluir-container {
    max-width: 500px;
    margin: 40px auto;
    padding: 25px;
    background-color: #fffafa; 
    border: 1px solid #f0d0d0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #444; 
    border-bottom: 1px solid #f0d0d0;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: 500;
}

.alerta-perigo {
    background-color: #f8d7da; 
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 20px;
    font-weight: 500;
    text-align: center;
}
  
form {
    display: flex;
    flex-direction: column;
}
  
.input-id {
    padding: 10px;
    margin-top: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
}
  
.btn-excluir {
    padding: 12px;
    background-color: #dc3545;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
}
  
.btn-excluir:hover {
    background-color: #c82333;
}
  
.sucesso-mensagem {
    margin-top: 20px;
    padding: 10px;
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    font-weight: 500;
}
  
.erro-mensagem {
    margin-top: 20px;
    padding: 10px;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    font-weight: 500;
}
```

#### 27. `component/excluir/excluir.component.ts`

Digite o seguinte código:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicamentosService } from '../../core/services/medicamentos.service';

@Component({
  selector: 'app-excluir',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './excluir.component.html',
  styleUrl: './excluir.component.css'
})
export class ExcluirComponent {
 idExcluir: number | null = null; 
  mensagemSucesso: string = '';
  erroMensagem: string = '';

  constructor(private service: MedicamentosService) { }

  excluirMedicamento(): void {
    this.mensagemSucesso = '';
    this.erroMensagem = '';
    
   if (this.idExcluir != null) { 
      
      if (!confirm(`Tem certeza que deseja EXCLUIR o medicamento de ID ${this.idExcluir}?`)) {
        return;
      }
      
      this.service.excluir(this.idExcluir).subscribe({
        next: () => {
          this.mensagemSucesso = `Medicamento com ID ${this.idExcluir} excluído com sucesso.`;
          this.idExcluir = null; 
        },
        error: (err) => {
          this.erroMensagem = `Erro ao excluir o medicamento.`;
          console.error('Erro de exclusão:', err);
        }
      });
    } else {
        this.erroMensagem = 'Por favor, informe um ID para exclusão.';
    }
  }
}
```

#### 28. `component/listar/listar.component.html`

Digite o seguinte código:

```html
<div class="content-container">
    <h2>Lista de Medicamentos Cadastrados</h2>
    
    <div class="table-wrapper">
        <table class="estoque-table">
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Nome</th>
                    <th>Fabricante</th>
                    <th>Data de Fabricação</th>
                    <th>Validade</th>
                    <th>Preço (R$)</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                @for (medicamento of listaMedicamentos; track medicamento.id){
                <tr>
                    <td>{{ medicamento.id }}</td>
                    <td>{{ medicamento.nome }}</td>
                    <td>{{ medicamento.fabricante }}</td>
                    <td>{{ medicamento.data_fabricacao | date:'dd/MM/yyyy' }}</td>
                    <td>{{ medicamento.data_validade | date:'dd/MM/yyyy' }}</td>
                    <td>{{ medicamento.preco | currency:'BRL':'symbol':'1.2-2' }}</td>
                    
                    <td class="acao-buttons">
                        <button class="btn-excluir" (click)="excluir(medicamento.id)">
                            <i class="fas fa-trash-alt"></i> Excluir
                        </button>
                    </td>
                </tr>
                }
            </tbody>
        </table>
    </div>

    <div *ngIf="listaMedicamentos.length === 0" class="mensagem-vazio">
        Nenhum medicamento cadastrado.
    </div>
</div>
```

#### 29. `component/listar/listar.component.css`

Digite o seguinte código:

```css
.content-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h2 {
    color: #333333;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 15px;
    margin-bottom: 25px;
    font-weight: 500;
}

.table-wrapper {
    width: 100%;
    overflow-x: auto; 
}

.estoque-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 750px; 
}

.estoque-table thead tr {
    background-color: #6c757d;
    color: white;
    font-weight: 600;
}

.estoque-table th, .estoque-table td {
    padding: 12px 18px;
    text-align: center; 
    border: 1px solid #e0e0e0;
}

.estoque-table tbody tr {
    background-color: #ffffff;
}

.estoque-table tbody tr:nth-child(even) {
    background-color: #f9f9f9; 
}

.estoque-table tbody tr:hover {
    background-color: #f1f1f1; 
}

.acao-buttons {
    white-space: nowrap; 
    display: flex;
    justify-content: center; 
    align-items: center;
}

.btn-excluir {
    padding: 7px 12px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
    background-color: #dc3545; 
    color: white;
    display: flex;
    align-items: center;
}

.btn-excluir i {
    margin-right: 5px;
}

.btn-excluir:hover {
    background-color: #c82333;
    transform: translateY(-1px);
}

.mensagem-vazio {
    margin-top: 20px;
    padding: 15px;
    background-color: #f0f0f0;
    border: 1px dashed #cccccc;
    color: #666;
    text-align: center;
    border-radius: 4px;
}

@media (max-width: 768px) {
    .estoque-table {
        min-width: 650px; 
    }
}
```

#### 30. `component/listar/listar.component.ts`

Digite o seguinte código:

```typescript
import { Component, OnInit } from '@angular/core';
import { Medicamento } from '../../core/types/types';
import { MedicamentosService } from '../../core/services/medicamentos.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule, CurrencyPipe],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  listaMedicamentos: Medicamento[] = [];

  constructor(
    private service: MedicamentosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarMedicamentos();
  }

  carregarMedicamentos(): void {
        this.service.listar().subscribe({
            next: (medicamentos) => {
                this.listaMedicamentos = medicamentos;
            },
            error: (err) => {
                console.error('Falha na comunicação com o JSON-Server:', err);
                alert('ERRO: Não foi possível carregar a lista de medicamentos. Verifique a API.');
            }
        });
    }

    excluir(id: number): void { 
        if (id) {
            this.service.excluir(id).subscribe({
                next: () => {
                    this.listaMedicamentos = this.listaMedicamentos.filter(
                        medicamento => medicamento.id !== id
                    );
                    console.log(`Medicamento ID ${id} excluído de forma imediata.`);
                },
                error: (err) => {
                    console.error('Erro ao excluir medicamento:', err);
                    alert('Falha ao excluir. Verifique a conexão com o servidor. (A exclusão foi bloqueada)');
                }
            });
        }
    }
}
```

<br>

# Teste

Para testar o backend (API simulada), siga estes passos:

1.  **Inicie o JSON-Server:**
    No primeiro terminal, navegue até a pasta `data` e execute o JSON-Server:

    ```bash
    cd data
    ```

    Em seguida, tente iniciar o servidor com um dos comandos abaixo:

    ```bash
    npx json-server farmacia.json
    ```

    *As opções `npx ng json-server farmacia.json` e `ng json-server farmacia.json` geralmente não são usadas para iniciar o JSON-Server diretamente, mas você pode tentar se os comandos acima não funcionarem. O comando `npx json-server` é o mais correto.*

2.  **Inicie a Aplicação Angular:**
    Abra um **novo terminal** e refaça o caminho até a pasta principal do projeto (`\farmacia`).

    Execute o servidor de desenvolvimento do Angular:

    ```bash
    ng serve --open
    ```

    ou

    ```bash
    npx ng serve --open
    ```

<br>

### ALERTA: ATENÇÃO AOS ARQUIVOS .TS 

> **Ao criar componentes em pastas separadas (`pages`, `component`, `core`), dois erros são comuns:**
>
> 1.  **Caminhos dos Imports:** Verifique se o caminho relativo (`../`) nos *imports* do TypeScript está correto (Ex.: `import { Medicamento } from '../types/types';`).
>
> 2.  **Capitalização (Case Sensitive):** O nome do componente deve ser consistente. Se a classe é `CabecalhoComponent`, use `CabecalhoComponent` nos *imports* (`app.component.ts`, `app.routes.ts`) para evitar erros de compilação.

<br>

### Dica Rápida: Ajuste de Nomes nos Componentes

Durante a criação de componentes, especialmente se for usada a opção `--standalone`, o Angular pode gerar arquivos com ou sem o sufixo `.component` no nome (Ex.: `listar.html` ou `listar.component.html`).

* **Verificação:** Verifique os nomes exatos dos arquivos gerados dentro da pasta do seu componente (`.html` e `.css`).
* **Ajuste no `.ts`:** No arquivo TypeScript (`.ts`) do componente, corrija as rotas (`templateUrl` e `styleUrl`) e o nome da classe (`export class SeuComponente`).

#### Exemplo de Ajuste no Arquivo `.ts` do componente reutilizável `Listar`:

Se o arquivo gerado foi `listar.html`, você deve garantir que a rota esteja correta:

```typescript
@Component({
  // ...
  templateUrl: './listar.html', // Corrija se necessário
  styleUrl: './listar.css'     // Corrija se necessário
})
export class ListarComponent { // Verifique se a classe é 'Listar' ou 'ListarComponent'
// ...
}
```
