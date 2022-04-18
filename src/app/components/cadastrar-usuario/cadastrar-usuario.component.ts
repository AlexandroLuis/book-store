import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {

  public formCadastrar: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService, private matSnackBar: MatSnackBar) {
    this.formCadastrar = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl ("", [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
  }
  private validarFormulario(): void {
    for (let campos in this.formCadastrar.controls) {
      this.formCadastrar.controls[campos].markAllAsTouched();
    }
  }
  public submitForm() {
    this.validarFormulario();
   /* if (!this.formCadastrar.valid) {
      return;
    }*/
    this.cadastrar();
  }
  cadastrar() {
    if (this.formCadastrar.controls['password'].value == this.formCadastrar.controls['confirmPassword'].value) {
      console.log('teste');
      this.usuarioService.cadastrarComEmailPassword(this.formCadastrar.controls['email'].value, this.formCadastrar.controls['password'].value)
        .then(() => {
          this.matSnackBar.open('Usuário cadastrado com sucesso!', 'OK', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3000
          })
          this.router.navigate(['/login'])
        })
        .catch((error) => {
          this.matSnackBar.open('Erro ao efetuar cadastro, tente novamente!', 'OK', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3000
          })
          console.log(error);
        })
    } else {
      console.log("teste2")
      this.matSnackBar.open('Senhas não coincidem!', 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000
      })
    }
  }
  public getMessageError(e: string) : any {
    switch(e) {
      case "e":
        if(this.formCadastrar.controls["email"].hasError('required')) {
          return "O campo EMAIL é obrigatório.";
        } else
          if(this.formCadastrar.controls["email"].hasError('email')) {
            return "Email inválido.";
          }
        break;
      case "s":
        if(this.formCadastrar.controls["password"].hasError('required')) {
          return "O campo SENHA é obrigatório.";
        } else
          if(this.formCadastrar.controls["password"].hasError('minlength')) {
            return "O campo SENHA deve ter no mínimo 6 caracteres.";
          }
        break;
      case "cs":
        if(this.formCadastrar.controls["confirmPassword"].hasError('required')) {
          return "O campo CONFIRMAR SENHA é obrigatório."
        }
    }
  }
}
