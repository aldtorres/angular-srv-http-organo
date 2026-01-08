import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livro } from '../componentes/livro/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private API_URL = "http://localhost:3000/livros"

  constructor(private httpClient: HttpClient) { }

  obterLivros(){
    return this.httpClient.get<Livro[]>(this.API_URL)
  }

}
