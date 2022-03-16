import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-listar-livros',
  templateUrl: './listar-livros.component.html',
  styleUrls: ['./listar-livros.component.scss']
})
export class ListarLivrosComponent implements OnInit {
  livros: Livro[] = []
  constructor(private service: LivroService, private router: Router) { }

  ngOnInit(): void {
    this.livros = this.service.getLivros();
  }
  public irParaCriarLivro() {
    this.router.navigate(['/criarLivro'])
  }
  public irParaEditar(id: number) {
    this.router.navigate(['/editarLivro', id])
  }
  public excluir(id : number) : void {
    let resultado = confirm("Deseja excluir o livro: " + this.service.getLivroById(id).getTitulo() + " ?");
    if(resultado) {
      if(this.service.delete(id)) {
        alert("Livro excluído com sucesso!");
      } else {
        alert("Erro ao excluir livro");
      }
      
    }
  }

}
