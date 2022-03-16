import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarLivroComponent } from './components/criar-livro/criar-livro.component';
import { EditarLivroComponent } from './components/editar-livro/editar-livro.component';
import { ListarLivrosComponent } from './components/listar-livros/listar-livros.component';

const routes: Routes = [
  {path: 'criarLivro', component: CriarLivroComponent},
  {path: 'listaDeLivros', component: ListarLivrosComponent},
  {path: 'editarLivro/:id', component: EditarLivroComponent},
  {path: '**', redirectTo: 'listaDeLivros'},
  {path: '', redirectTo: 'listaDeLivros', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
