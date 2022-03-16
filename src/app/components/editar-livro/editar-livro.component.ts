import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { Livro } from 'src/app/models/livro';

@Component({
  selector: 'app-editar-livro',
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.scss']
})
export class EditarLivroComponent implements OnInit {
  public formEditar: FormGroup;
  public generoSelecionado: string = "";
  public situacaoSelecionada: string = "";
  public indice: number = -1;
  public generos: string[] = [
    'Romance',
    'Drama',
    'Novela',
    'Conto',
    'Crônica',
    'Ensaio',
    'Poesia',
    'Carta',
    'Biografia',
    'Memórias',
    'Ficção',
    'Aventura',
    'Tecnologia',
    'História em Quadrinhos (HQ)',
    'Literatura Infantil',
    'Literatura Infanto-juvenil',
    'Literatura Nacional',
    'Terror',
    'Material Acadêmico'
  ];
  constructor(private formBuilder: FormBuilder, private service: LivroService, private router: Router, private actRoute: ActivatedRoute) {
    this.formEditar = formBuilder.group({
      isbn: ["", [Validators.required, Validators.minLength(5)]],
      titulo: ["", [Validators.required, Validators.minLength(3)]],
      autor: ["", [Validators.required, Validators.minLength(3)]],
      genero: ["", [Validators.required]],
      situacao: ["", [Validators.required]],
      resumo: ["", [Validators.required]],
      editora: ["", [Validators.required, Validators.minLength(4)]],
    })
  }

  ngOnInit(): void {
  
    this.actRoute.params.subscribe((parametros) => {
      if(parametros['id']) {
        this.indice = parametros['id'];
        let livro = this.service.getLivroById(this.indice);
        this.setGenero(livro.getGenero())
        this.setSituacao(livro.getSituacao());
        this.formEditar = this.formBuilder.group({
          isbn: [livro.getIsbn(), [Validators.required, Validators.minLength(5)]],
          titulo: [livro.getTitulo(), [Validators.required, Validators.minLength(3)]],
          autor: [livro.getAutor(), [Validators.required, Validators.minLength(3)]],
          genero: [livro.getGenero(), [Validators.required]],
          situacao: [livro.getSituacao(), [Validators.required]],
          resumo: [livro.getResumo(), [Validators.required]],
          editora: [livro.getEditora(), [Validators.required, Validators.minLength(4)]],
        })
      }
    })
  }
  /*private validarFormulario(): void {
    for (let campos in this.formCadastrar.controls) {
      //this.formCadastrar.controls[campos].markAllAsTouched();
    }
  }*/
  public submitForm() {
    if (!this.formEditar.valid) {
      alert("Erro! Verifique os campos")
    } else
      this.salvar();
  }
  public salvar(): void {
    let livro = new Livro(this.formEditar.controls["isbn"].value, this.formEditar.controls["titulo"].value, this.formEditar.controls["autor"].value, this.formEditar.controls
    ["genero"].value, this.formEditar.controls["situacao"].value, this.formEditar.controls["resumo"].value, this.formEditar.controls["editora"].value);
    if(this.service.update(this.indice, livro)) {
      alert("Livro editado com sucesso!");
      this.router.navigate(['/listaDeLivros']);
    } else {
      alert("Erro ao editar livro");
    }
    
  }
  public setGenero(value: string) {
    this.formEditar.controls["genero"].setValue(value);
  }
  public setSituacao(value: string) {
    this.formEditar.controls["situacao"].setValue(value);
  }

}
