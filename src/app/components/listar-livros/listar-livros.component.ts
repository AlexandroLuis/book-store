import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { MatDialog } from '@angular/material/dialog';
import { DialogExcluirComponent } from '../dialog-excluir/dialog-excluir.component';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-listar-livros',
  templateUrl: './listar-livros.component.html',
  styleUrls: ['./listar-livros.component.scss']
})
export class ListarLivrosComponent implements OnInit {
  lista_imagens?: any[];
  livros: Livro[] = [];
  constructor(private livroService: LivroService, private router: Router, private matSnackBar : MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregarLivros();
  }
  public carregarLivros() {
    this.livroService.getLivros().subscribe(response => {
      this.livros = response.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Livro
        } as Livro
      })
    }, err => {
      console.log(err);
    })
  }
  public irParaCriarLivro() {
    this.router.navigate(['/dashboard/criarLivro'])
  }
  public irParaEditar(livro: Livro) {
    this.router.navigate(['dashboard/editarLivro', livro.id])
  }
  openDialog(livro: Livro) {
    this.dialog.open(DialogExcluirComponent, {data : livro});
  }
}
