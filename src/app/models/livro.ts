export class Livro {
    id?: string;
    isbn: string = "";
    titulo: string = "";
    autor: string = ""
    genero: string = ""
    situacao: string = "";
    resumo: string = "";
    editora: string = "";
    downloadURL: string = "";

    constructor(isbn: string, titulo: string, autor: string, genero: string, situacao: string, resumo: string, editora: string, downloadURL: string) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.situacao = situacao;
        this.resumo = resumo;
        this.editora = editora;
        this.downloadURL = downloadURL;
    }
}