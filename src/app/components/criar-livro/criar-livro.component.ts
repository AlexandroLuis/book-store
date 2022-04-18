import { Livro } from 'src/app/models/livro';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LivroService } from 'src/app/services/livro.service';


@Component({
  selector: 'app-criar-livro',
  templateUrl: './criar-livro.component.html',
  styleUrls: ['./criar-livro.component.scss']
})
export class CriarLivroComponent implements OnInit {

  public formCadastrar: FormGroup;
  public generos: string[] = [
    'Autoajuda',
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
  constructor(private formBuilder: FormBuilder, private router: Router, private matSnackBar: MatSnackBar, private livroService: LivroService) {

    this.formCadastrar = this.formBuilder.group({
      isbn: new FormControl("", [Validators.required, Validators.minLength(13)]),
      titulo: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      autor: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      genero: new FormControl("", [Validators.required]),
      situacao: new FormControl("", [Validators.required]),
      resumo: new FormControl("", [Validators.required]),
      editora: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(27)]),
      imagem: new FormControl("", [Validators.required])
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
      this.matSnackBar.open('Erro! Verifique os campos.', 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000
      })
    } else {
      this.salvar();
    }

  }
  public salvar(): void {
    const target = document.getElementById("file") as HTMLInputElement
    const file: File = (target.files as FileList)[0];
    this.uploadFile(file, this.formCadastrar.value)
      .then((r) => {
        console.log('r = ' + r)
        this.matSnackBar.open('Livro salvo com sucesso!', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000
        })
        this.router.navigate(['/dashboard']);
      })
      .catch(() => this.matSnackBar.open('Ocorreu um erro ao salvar o livro', 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000
      }))

  }
  async uploadFile(event: any, livro: Livro) {

    return this.livroService.uploadStorage(event, livro)
      .then((data) => { console.log(data) })
      .catch((error) => { console.log(error) })
  }
  public setGenero(value: string) {
    this.formCadastrar.controls["genero"].setValue(value);
  }
  public setSituacao(value: string) {
    this.formCadastrar.controls["situacao"].setValue(value);
  }
  public setDownloadURL(value: string) {
    this.formCadastrar.controls["imagem"].setValue(value);
  }
  public redirectToListaDeLivros() {
    this.router.navigate(['/listaDeLivros']);
  }
  public getErrorMessage(e: string): any {
    switch (e) {
      case "i":
        if (this.formCadastrar.controls["isbn"].hasError('required')) {
          return "O campo ISBN é obrigatório.";
        } else
          if (this.formCadastrar.controls["isbn"].hasError('minlength')) {
            return "O campo ISBN deve ter 13 dígitos."
          }
        break;
      case "t":
        if (this.formCadastrar.controls["titulo"].hasError('required')) {
          return "O campo TÍTULO é obrigatório."
        } else
          if (this.formCadastrar.controls["titulo"].hasError('minlength')) {
            return "O campo TÍTULO deve ter no mínimo 3 e no máximo 20 caracteres."
          } else
            if (this.formCadastrar.controls["titulo"].hasError('maxlength')) {
              return "O campo TÍTULO deve ter no mínimo 3 e no máximo 20 caracteres."
            }
        break;
      case "a":
        if (this.formCadastrar.controls["autor"].hasError('required')) {
          return "O campo AUTOR é obrigatório."
        } else
          if (this.formCadastrar.controls["autor"].hasError('minlength')) {
            return "O campo AUTOR deve ter no mínimo 3 e no máximo 35 caracteres."
          } else
            if (this.formCadastrar.controls["autor"].hasError('maxlength')) {
              return "O campo AUTOR deve ter no mínimo 3 e no máximo 35 caracteres."
            }
        break
      case "g":
        if (this.formCadastrar.controls["genero"].hasError('required')) {
          return "O campo GÊNERO é obrigatório."
        }
        break
      case "s":
        if (this.formCadastrar.controls["situacao"].hasError('required')) {
          return "O campo SITUAÇÃO é obrigatório."
        }
        break
      case "e":
        if (this.formCadastrar.controls["editora"].hasError('required')) {
          return "O campo EDITORA é obrigatório."
        } else
          if (this.formCadastrar.controls["editora"].hasError('minlength')) {
            return "O campo EDITORA deve ter no mínimo 3 e no máximo 27 caracteres."
          } else
            if (this.formCadastrar.controls["editora"].hasError('maxlength')) {
              return "O campo EDITORA deve ter no mínimo 3 e no máximo 27 caracteres."
            }
        break
      case "r":
        if (this.formCadastrar.controls["resumo"].hasError('required')) {
          return "O campo RESUMO é obrigatório."
        }
        break;

    }
  }
}
