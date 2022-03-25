import { LivroFirebaseService } from './../../services/livro-firebase.service';
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
  public id?: any;
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
  constructor(private formBuilder: FormBuilder, private service: LivroFirebaseService, private router: Router, private actRoute: ActivatedRoute) {
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
      if (parametros['id']) {
        this.id = parametros['id'];
        this.service.getLivroById(this.id).subscribe(response => {
          let livro : any = response
          this.formEditar = this.formBuilder.group({
            isbn: [livro.isbn, [Validators.required, Validators.minLength(5)]],
            titulo: [livro.titulo, [Validators.required, Validators.minLength(3)]],
            autor: [livro.autor, [Validators.required, Validators.minLength(3)]],
            genero: [livro.genero, [Validators.required]],
            situacao: [livro.situacao, [Validators.required]],
            resumo: [livro.resumo, [Validators.required]],
            editora: [livro.editora, [Validators.required, Validators.minLength(4)]],
          })
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
    this.service.update(this.formEditar.value, this.id)
    .then(() => {
      alert("Livro editado com sucesso!")
      this.router.navigate(['/listaDeLivros']);
    })
    .catch(() => {alert("Erro ao editar livro")})
  }
  public setGenero(value: string) {
    this.formEditar.controls["genero"].setValue(value);
  }
  public setSituacao(value: string) {
    this.formEditar.controls["situacao"].setValue(value);
  }
  public redirectToListaDeLivros() {
    this.router.navigate(['']);
  }
}
