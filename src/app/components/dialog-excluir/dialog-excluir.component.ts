import { LivroService } from './../../services/livro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Livro } from 'src/app/models/livro';

@Component({
  selector: 'app-dialog-excluir',
  templateUrl: './dialog-excluir.component.html',
  styleUrls: ['./dialog-excluir.component.scss']
})
export class DialogExcluirComponent implements OnInit {

  livro: Livro;
  constructor(private livroService: LivroService, @Inject(MAT_DIALOG_DATA) public data: Livro, private matSnackBar: MatSnackBar) {
    this.livro = data
  }

  ngOnInit(): void {
  }
  excluir() {
    this.livroService.delete(this.livro as Livro)
      .then(() => {
        this.matSnackBar.open('Livro excluído com sucesso!', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000
        })
      })
      .catch(() => {
        this.matSnackBar.open('Erro ao excluir livro!', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000
        })
      })
  }
}

