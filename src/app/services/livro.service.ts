import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  task?: AngularFireUploadTask;
  uploadedFileURL?: Observable<string>;
  fileName?: string;
  static linkDownloadURL?: string
  private _PATH = 'livros';

  constructor(private storage: AngularFireStorage, private angularFire: AngularFirestore, private matSnackBar : MatSnackBar) { }
  /**Métodos do livro */
  public getLivroById(id: string) {
    return this.angularFire.collection(this._PATH).doc(id).valueChanges();
  }
  public getLivros() {
    return this.angularFire.collection(this._PATH, ref => ref.orderBy("titulo")).snapshotChanges();
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
  /**Métodos imagem do livro */
  async uploadStorage(file: File, livro: Livro) {
    if (file.type.split('/')[0] != 'image') {
      return
    }
    this.fileName = file.name;
    const directory = `${this._PATH}/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(directory);
    this.task = this.storage.upload(directory, file);
    
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.uploadedFileURL = fileRef.getDownloadURL();
        this.uploadedFileURL.subscribe((response) => {
          livro.downloadURL = response,
            this.uploadDataBase(livro);
        });
      })
    ).subscribe()
  }
  uploadDataBase(livro: Livro) {
    this.angularFire.collection(this._PATH).add(livro)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        alert("Erro ao salvar imagem!")
        console.log(error);
      })
  }
  getImages() {
    return this.angularFire.collection(this._PATH).snapshotChanges().pipe(
      map((action) => {
        console.log(action);
        return action.map((dados) => ({
          key: dados.payload.doc.id,
          data: dados.payload.doc.data()
        }))
      }));
  }
}
