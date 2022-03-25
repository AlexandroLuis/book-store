import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { LivroFirebaseService } from 'src/app/services/livro-firebase.service';

@Component({
  selector: 'app-listar-livros',
  templateUrl: './listar-livros.component.html',
  styleUrls: ['./listar-livros.component.scss']
})
export class ListarLivrosComponent implements OnInit {
  livros: Livro[] = []
  constructor(private service: LivroFirebaseService, private router: Router) { }

  ngOnInit(): void {
    this.carregarLivros();
  }
  public carregarLivros() {
    this.service.getLivros().subscribe(response => {
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
    this.router.navigate(['/criarLivro'])
  }
  public irParaEditar(livro: Livro) {
    this.router.navigate(['/editarLivro', livro.id])
  }
  public excluir(livro: Livro) : void {
    let resultado = confirm("Deseja excluir o livro: " + livro.titulo + " ?");
    if(resultado) {
      this.service.delete(livro)
      .then(() => {alert("Livro excluído com sucesso!");})
      .catch(() => {alert("Erro ao excluir livro");})  
    }
  }

}
