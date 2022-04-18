import { GoogleAuthProvider } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  storage: Storage;
  constructor(private authService: AngularFireAuth) { 
    this.storage = window.localStorage;
  }

  loginComEmailPassword(email: string, password: string) {
    return this.authService.signInWithEmailAndPassword(email, password)
    .then((response) => {
      this.storage?.setItem("condicao", "autenticado");
    })
  }
  cadastrarComEmailPassword(email: string, password: string) {
    return this.authService.createUserWithEmailAndPassword(email, password);
  }
  loginComGoogleCount() {
    return this.authLoginProvider(new GoogleAuthProvider());
  }
  authLoginProvider(provider: any) {
    return this.authService.signInWithPopup(provider)
    .then((response) => {
      this.storage?.setItem("condicao", "autenticado");
    })
    .catch((error) => {
      console.log(error);
    })
  }
  logout() {
    this.storage.clear();
    return this.authService.signOut();
  }
}
