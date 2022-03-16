import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-criar-livro',
  templateUrl: './criar-livro.component.html',
  styleUrls: ['./criar-livro.component.scss']
})
export class CriarLivroComponent implements OnInit {
  public formCadastrar: FormGroup;
  public generoSelecionado: string = "";
  public situacaoSelecionada: string = "";
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
  constructor(private formBuilder: FormBuilder, private service: LivroService, private router: Router) {
    this.formCadastrar = formBuilder.group({
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
  }
  /*private validarFormulario(): void {
    for (let campos in this.formCadastrar.controls) {
      //this.formCadastrar.controls[campos].markAllAsTouched();
    }
  }*/
  public submitForm() {
    if (!this.formCadastrar.valid) {
      alert("Erro! Verifique os campos")
    } else
      this.salvar();
  }
  public salvar(): void {
    this.service.insert(new Livro(this.formCadastrar.controls["isbn"].value, this.formCadastrar.controls["titulo"].value, this.formCadastrar.controls["autor"].value, this.formCadastrar.controls
    ["genero"].value, this.formCadastrar.controls["situacao"].value, this.formCadastrar.controls["resumo"].value, this.formCadastrar.controls["editora"].value))
    alert("Livro salvo com sucesso!");
    this.router.navigate(['/listaDeLivros']);
  }
  public setGenero(value: string) {
    this.formCadastrar.controls["genero"].setValue(value);
  }
  public setSituacao(value: string) {
    this.formCadastrar.controls["situacao"].setValue(value);
  }
}
