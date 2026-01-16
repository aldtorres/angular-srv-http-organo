import { Component, OnInit } from '@angular/core';
import { FormularioComponent } from "../../componentes/formulario/formulario.component";
import { Livro } from '../../componentes/livro/livro';
import { LivroService } from '../../services/livro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-livro',
  imports: [FormularioComponent],
  templateUrl: './editar-livro.component.html',
  styleUrl: './editar-livro.component.css'
})
export class EditarLivroComponent implements OnInit {
  livro!: Livro;

  constructor(
    private livroService:LivroService, 
    private activatedRoute:ActivatedRoute,
    private router:Router
  ){}
  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if(id){
      this.livroService.obterLivroPorId(id).subscribe((livroLocal) => {
        this.livro = livroLocal
      });
    }
  }

  atualizar_livro(livro: Livro) {
    this.livroService.atualizarLivro(livro).subscribe(()=>{
      this.router.navigate(['lista-livros']);
    })
  }


}
