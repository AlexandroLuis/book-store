import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CriarLivroComponent } from './components/criar-livro/criar-livro.component';
import { EditarLivroComponent } from './components/editar-livro/editar-livro.component';
import { ListarLivrosComponent } from './components/listar-livros/listar-livros.component';
import { NgxMaskModule } from 'ngx-mask';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CadastrarUsuarioComponent } from './components/cadastrar-usuario/cadastrar-usuario.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './components/home/home.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogExcluirComponent } from './components/dialog-excluir/dialog-excluir.component';

@NgModule({
  declarations: [
    AppComponent,
    CriarLivroComponent,
    EditarLivroComponent,
    ListarLivrosComponent,
    LoginComponent,
    UsuarioComponent,
    CadastrarUsuarioComponent,
    HomeComponent,
    DialogExcluirComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgxMaskModule.forRoot(),
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
