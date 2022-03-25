import { Livro } from 'src/app/models/livro';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { _ParseAST } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LivroFirebaseService {

  private _PATH = "livros";
  constructor(private angularFire : AngularFirestore) { }

  public getLivroById(id: string) {
    return this.angularFire.collection(this._PATH).doc(id).valueChanges();
  }
  public getLivros() {
    return this.angularFire.collection(this._PATH).snapshotChanges();
  }
  public insert(livro: Livro) {
    return this.angularFire.collection(this._PATH).add(livro);
  }
  public update(livro: Livro, id: string) {
    return this.angularFire.collection(this._PATH).doc(id).update({
      isbn: livro.isbn,
      titulo: livro.titulo,
      autor: livro.autor,
      genero: livro.genero,
      editora: livro.editora,
      situacao: livro.situacao,
      resumo: livro.resumo
    })
  }
  public delete(livro: Livro) {
    return this.angularFire.collection(this._PATH).doc(livro.id).delete();
  }

}
