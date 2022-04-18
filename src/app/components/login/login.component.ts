import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin : FormGroup;
  constructor(private router : Router, private formBuilder: FormBuilder, private usuarioService : UsuarioService, private matSnackBar : MatSnackBar) { 
    this.formLogin = this.formBuilder.group({
      email : new FormControl("", [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
  }
  private validarFormulario() : void {
    for(let campos in this.formLogin.controls) {
      this.formLogin.controls[campos].markAllAsTouched();
    }
  }
  public submitForm() {
    this.validarFormulario();
    if(!this.formLogin.valid) {
      return;
    }
    this.logarComEmailPassword();
  }
  logarComEmailPassword(){
    this.usuarioService.loginComEmailPassword(this.formLogin.controls['email'].value, this.formLogin.controls['password'].value)
    .then(() => {
      this.router.navigate(['/dashboard'])
    })
    .catch((error) => {
      this.matSnackBar.open('Email ou senha inválidos!', 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000
      })
      console.log(error);
    })
  }
  irParaCriarConta() {
    this.router.navigate(['/cadastrarUsuario'])
  }
  logarComGoogleCount() {
    console.log('entrou');
    this.usuarioService.loginComGoogleCount()
    .then(() => {
      this.router.navigate(['/dashboard'])
    })
    .catch((error) => {
      alert("Erro ao efetuar login, tente novamente!");
      console.log(error);
    })
  }
  public getMessageError(e: string) : any {
    switch(e) {
      case "e":
        if(this.formLogin.controls["email"].hasError('required')) {
          return "O campo EMAIL é obrigatório.";
        } else
          if(this.formLogin.controls["email"].hasError('email')) {
            return "Email inválido.";
          }
        break;
      case "p":
        if(this.formLogin.controls["password"].hasError('required')) {
          return "O campo SENHA é obrigatório.";
        } else
          if(this.formLogin.controls["password"].hasError('minlength')) {
            return "O campo SENHA deve ter no mínimo 6 caracteres.";
          }
        break;
    }
  }
}
