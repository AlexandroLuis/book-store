import { Component } from '@angular/core';
import { Livro } from './models/livro';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
  public genero: string = ""
  public situacao: string = ""
  public livros: Livro[] = []
  public isbn: string = "";
  public titulo: string = "";
  public autor: string = "";
  public resumo: string = "";
  public editora: string = "";
  public indice = -1;
  constructor() {
    let livro1 = new Livro("85858", "Código limpo: Habilidades práticas do Agile Software", "Robert C. Martin", "Tecnologia", "novo", "Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com uma empresa de desenvolvimento. Perdem-se a cada ano horas incontáveis e recursos importantes devido a um código mal escrito. Mas não precisa ser assim", "Alta Books");
    let livro2 = new Livro("85858", "Vivendo como um guerreiro", " Whindersson Nunes (Autor), Gabriel Chalita (Autor)", "Biografia", "usado", "Do interior do Piauí, brotou um menino espalhador de alegrias, um guerreiro na arte de pedir licença às adversidades e prosseguir vencendo. Whindersson tem a capacidade de ler a alma das pessoas e entrar nelas. É atento com o outro. Com os medos e os sonhos do outro. E vai além. É compassivo. É generoso. Ouvir cenas de sua vida é encontrar razões para prosseguir acreditando na natureza humana. Nada de perversidades. Nada de distrações no tema maior do existir: ser bom para o outro. Whindersson é bom para o outro, é bom para os milhões que dedicam pedaços de suas vidas para acompanhar a vida do tal menino espalhador de alegrias. Disse Euclides da Cunha que: O sertanejo é, antes de tudo, um forte. Em tudo de Whindersson, 'há a força do sertão nordestino'. Em seus exemplos. Em suas lembranças. Em seu estender a mão para dar oportunidades. Mas é ele também frágil, como se deve ser, como se é quem tem sensibilidade. É instigante ouvir o seu relato sobre a dor. E ela já o visitou muitas vezes. E ele a recebeu. Aprendeu e pediu licenças para prosseguir cultivando a felicidade. O que mais me impressiona em seus relatos é a verdade. Não há máscara no mundo mais bonita do que o rosto humano. E ele sabe disso. E, por isso, revela-se generosamente. E, por isso, inspira. Que seja este livro uma inspiração que dignifique a vida e que semeie, no mundo, mundos melhores, de pessoas mais atentas, de mulheres e homens decididos a prosseguir 'Vivendo como guerreiros'.", "Serena");
    this.livros.push(livro1, livro2)
   }

  public salvar(): void {
    if(this.indice == -1) {
      let livro = new Livro(this.isbn, this.titulo, this.autor, this.genero, this.situacao, this.resumo, this.editora);
      this.livros.push(livro);
    } else {
      this.livros[this.indice].setAutor(this.autor)
      this.livros[this.indice].setTitulo(this.titulo)
      this.livros[this.indice].setEditora(this.editora)
      this.livros[this.indice].setResumo(this.resumo)
      this.livros[this.indice].setGenero(this.genero)
      this.livros[this.indice].setSituacao(this.situacao)
      this.livros[this.indice].setIsbn(this.isbn)
      this.indice = -1;
      alert("Livro atualizado com sucesso!");
    }
    this.titulo = "";
    this.isbn = "";
    this.autor = "";
    this.editora = "";
    this.resumo = "";
    this.genero = "";
    this.situacao = "";
    

  }
  public editar(index: number) : void {
    this.indice = index;
    this.titulo = this.livros[index].getTitulo();
    this.isbn = this.livros[index].getIsbn();
    this.autor = this.livros[index].getAutor();
    this.editora = this.livros[index].getEditora();
    this.resumo = this.livros[index].getResumo();
    this.genero = this.livros[index].getGenero();
    this.situacao = this.livros[index].getSituacao();

  }
  public excluir(index: number) : void {
    this.livros.splice(index, 1);
    alert("Livro excluído com sucesso!");
  }
  public setGenero(value: string) {
    this.genero = value
  }
  public setSituacao(value: string) {
    this.situacao = value
  }
}
