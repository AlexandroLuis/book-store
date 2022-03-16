import { Injectable } from '@angular/core';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private livros : Livro[] = [];
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
  constructor() {

    this.livros.push(
      new Livro(
        "145-78-7458-9",
        "Código limpo: Habilidades práticas do Agile Software",
        "Robert C. Martin",
        "Tecnologia",
        "novo",
        "Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com uma empresa de desenvolvimento. Perdem-se a cada ano horas incontáveis e recursos importantes devido a um código mal escrito. Mas não precisa ser assim.",
        "Alta Books"
        )
      );
      this.livros.push(
        new Livro(
          "153-25-5876-4",
          "Vivendo como um guerreiro",
          "Whindersson Nunes (Autor), Gabriel Chalita (Autor)",
          "Biografia",
          "usado",
          "Do interior do Piauí, brotou um menino espalhador de alegrias, um guerreiro na arte de pedir licença às adversidades e prosseguir vencendo. Whindersson tem a capacidade de ler a alma das pessoas e entrar nelas. É atento com o outro. Com os medos e os sonhos do outro. E vai além. É compassivo. É generoso. Ouvir cenas de sua vida é encontrar razões para prosseguir acreditando na natureza humana. Nada de perversidades. Nada de distrações no tema maior do existir: ser bom para o outro. Whindersson é bom para o outro, é bom para os milhões que dedicam pedaços de suas vidas para acompanhar a vida do tal menino espalhador de alegrias. Disse Euclides da Cunha que: O sertanejo é, antes de tudo, um forte. Em tudo de Whindersson, 'há a força do sertão nordestino'. Em seus exemplos. Em suas lembranças. Em seu estender a mão para dar oportunidades. Mas é ele também frágil, como se deve ser, como se é quem tem sensibilidade. É instigante ouvir o seu relato sobre a dor. E ela já o visitou muitas vezes. E ele a recebeu. Aprendeu e pediu licenças para prosseguir cultivando a felicidade. O que mais me impressiona em seus relatos é a verdade. Não há máscara no mundo mais bonita do que o rosto humano. E ele sabe disso. E, por isso, revela-se generosamente. E, por isso, inspira. Que seja este livro uma inspiração que dignifique a vida e que semeie, no mundo, mundos melhores, de pessoas mais atentas, de mulheres e homens decididos a prosseguir 'Vivendo como guerreiros'.",
          "Serena"
          )
        );

   }
  public getLivros() : Livro[] {
    return this.livros;
  }
  public getLivroById(id : number) : Livro {
    return this.livros[id];
  } 
  public insert(livro: Livro) : boolean {
    this.livros.push(livro);
    return true;
  }
  public update(id : number, livro: Livro) : boolean {
    this.livros[id] = livro;
    return true;
  }
  public delete(id : number) : boolean {
    this.livros.splice(id, 1);
    return true;
  }
}