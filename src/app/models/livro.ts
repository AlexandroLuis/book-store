export class Livro {
    private isbn: string = "";
    private titulo: string = "";
    private autor: string = ""
    private genero: string = ""
    private situacao: string = "";
    private resumo: string = "";
    private editora: string = "";

    constructor(isbn: string, titulo: string, autor: string, genero: string, situacao: string, resumo: string, editora: string) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.situacao = situacao;
        this.resumo = resumo;
        this.editora = editora;
    }
    public getIsbn() : string {
        return this.isbn;
    }
    public setIsbn(isbn: string) : void {
        this.isbn = isbn;
    }
    public getTitulo() : string {
        return this.titulo;
    }
    public setTitulo(titulo: string) : void {
        this.titulo = titulo;
    }
    public getAutor() : string {
        return this.autor;
    }
    public setAutor(autor: string) : void {
        this.autor = autor;
    }
    public getGenero() : string {
        return this.genero;
    }
    public setGenero(genero: string) : void {
        this.genero = genero;
    }
    public getSituacao() : string {
        return this.situacao;
    }
    public setSituacao(situacao: string) : void {
        this.situacao = situacao;
    }
    public getResumo() : string {
        return this.resumo;
    }
    public setResumo(resumo: string) : void {
        this.resumo = resumo;
    }
    public getEditora() : string {
        return this.editora;
    }
    public setEditora(editora: string) : void {
        this.editora = editora;
    }
}