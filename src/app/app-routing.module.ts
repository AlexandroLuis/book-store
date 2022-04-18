import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarUsuarioComponent } from './components/cadastrar-usuario/cadastrar-usuario.component';
import { CriarLivroComponent } from './components/criar-livro/criar-livro.component';
import { EditarLivroComponent } from './components/editar-livro/editar-livro.component';
import { HomeComponent } from './components/home/home.component';
import { ListarLivrosComponent } from './components/listar-livros/listar-livros.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioGuard } from './services/usuario.guard';

const routes: Routes = [
  {path: 'dashboard', component: HomeComponent, canActivate: [UsuarioGuard], children: [
    {path: '', component: ListarLivrosComponent},
    {path: 'criarLivro', component: CriarLivroComponent},
    {path: 'editarLivro/:id', component: EditarLivroComponent},
  ]},
  {path: 'cadastrarUsuario', component: CadastrarUsuarioComponent},
  {path: '**', redirectTo: 'login'},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
