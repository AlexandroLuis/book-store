import { LivroService } from './../../services/livro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
  constructor(private formBuilder: FormBuilder, private livroService: LivroService, private router: Router, private actRoute: ActivatedRoute, private matSnackBar: MatSnackBar) {
    this.formEditar = formBuilder.group({
      isbn: new FormControl(),
      titulo: new FormControl(),
      autor: new FormControl(),
      genero: new FormControl(),
      situacao: new FormControl(),
      resumo: new FormControl(),
      editora: new FormControl(),
      imagem: new FormControl()
    })
  }

  ngOnInit(): void {

    this.actRoute.params.subscribe((parametros) => {
      if (parametros['id']) {
        this.id = parametros['id'];
        this.livroService.getLivroById(this.id).subscribe(response => {
          let livro : any = response
          this.formEditar = this.formBuilder.group({
            isbn: [livro.isbn, [Validators.required, Validators.minLength(13)]],
            titulo: [livro.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            autor: [livro.autor,[ Validators.minLength(3), Validators.maxLength(35)]],
            genero: [livro.genero, [Validators.required]],
            situacao: [livro.situacao, [Validators.required]],
            resumo: [livro.resumo, [Validators.required]],
            editora: [livro.editora, [Validators.required, Validators.minLength(3), Validators.maxLength(27)]]
          })
        })
      }
    })
  }
  /*private validarFormulario(): void {
    for (let campos in this.formEditar.controls) {
      //this.formEditar.controls[campos].markAllAsTouched();
    }
  }*/
  public submitForm() {
    if (!this.formEditar.valid) {
      this.matSnackBar.open('Erro! Verifique os campos.', 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000
      })
    } else
      this.salvar();
  }
  public salvar(): void {
    this.livroService.update(this.formEditar.value, this.id)
    .then(() => {
      this.matSnackBar.open('Livro atualizado com sucesso!', 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000
      })
      this.router.navigate(['/dashboard']);
    })
    .catch(() => {
      alert("Erro ao salvar livro");
    })
  }
  public getErrorMessage(e : string) : any {
    switch(e) {
      case "i":
        if (this.formEditar.controls["isbn"].hasError('required')) {
          return "O campo ISBN é obrigatório.";
        } else
        if (this.formEditar.controls["isbn"].hasError('minlength')) {
          return "O campo ISBN deve ter 13 dígitos."
        }
        break;
      case "t":
        if (this.formEditar.controls["titulo"].hasError('required')) {
          return "O campo TÍTULO é obrigatório."
        } else
        if (this.formEditar.controls["titulo"].hasError('minlength')) {
          return "O campo TÍTULO deve ter no mínimo 3 e no máximo 20 caracteres."
        } else
        if (this.formEditar.controls["titulo"].hasError('maxlength')) {
          return "O campo TÍTULO deve ter no mínimo 3 e no máximo 20 caracteres."
        }
        break;
      case "a":
        if (this.formEditar.controls["autor"].hasError('required')) {
          return "O campo AUTOR é obrigatório."
        } else
        if (this.formEditar.controls["autor"].hasError('minlength')) {
          return "O campo AUTOR deve ter no mínimo 3 e no máximo 35 caracteres."
        } else
        if (this.formEditar.controls["autor"].hasError('maxlength')) {
          return "O campo AUTOR deve ter no mínimo 3 e no máximo 35 caracteres."
        }
        break
      case "g":
        if (this.formEditar.controls["genero"].hasError('required')) {
          return "O campo GÊNERO é obrigatório."
        }
        break
      case "s":
        if (this.formEditar.controls["situacao"].hasError('required')) {
          return "O campo SITUAÇÃO é obrigatório."
        }
        break
      case "e":
        if (this.formEditar.controls["editora"].hasError('required')) {
          return "O campo EDITORA é obrigatório."
        } else
        if (this.formEditar.controls["editora"].hasError('minlength')) {
          return "O campo EDITORA deve ter no mínimo 3 e no máximo 27 caracteres."
        } else
        if (this.formEditar.controls["editora"].hasError('maxlength')) {
          return "O campo EDITORA deve ter no mínimo 3 e no máximo 27 caracteres."
        }
        break
      case "r":
        if (this.formEditar.controls["resumo"].hasError('required')) {
          return "O campo RESUMO é obrigatório."
        }
        break;
      default: 
        return 
    }
  }
  public setGenero(value: string) {
    this.formEditar.controls["genero"].setValue(value);
  }
  public setSituacao(value: string) {
    this.formEditar.controls["situacao"].setValue(value);
  }
  public redirectToListaDeLivros() {
    this.router.navigate(['/listaDeLivros']);
  }
}
