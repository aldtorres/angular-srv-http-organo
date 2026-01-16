import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { GeneroLiterario, Livro } from '../livro/livro';
import { CampoTextoComponent } from '../campo-texto/campo-texto.component';
import { ListaSuspensaComponent } from '../lista-suspensa/lista-suspensa.component';
import { BotaoComponent } from '../botao/botao.component';
import { DivisorComponent } from '../divisor/divisor.component';
import { TituloComponent } from '../titulo/titulo.component';
import { SubtituloComponent } from '../subtitulo/subtitulo.component';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-formulario',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CampoTextoComponent,
    CommonModule,
    ListaSuspensaComponent,
    BotaoComponent,
    DivisorComponent,
    TituloComponent,
    SubtituloComponent
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit, OnChanges {
  
  
  livro = input<Livro | null>(null);//pot0001-ancora
  //filho=>pai
  submitForm = output<Livro>();

  livroFormulario!: FormGroup;
  generos: GeneroLiterario[] = [];

  

  constructor(
    private formBuilder: FormBuilder,
    private livroService: LivroService
  ) { }


  ngOnInit() {
    this.generos = this.livroService.generos;
    this.inicializarlivroFormulario();
  }

  //pot0001-ancora
  //sempre seá disparado qdo houve alguma alteração no compomente [propriedade livro]
  ngOnChanges(changes: SimpleChanges): void {
    //SimpleChanges=> obj contem todas as altrações da inputsProps
    //changes['livro'] => 'livro' => propriedade livro 
    if(changes['livro'] && this.livro()){
      this.livroFormulario.patchValue({
        ...this.livro(),
        genero: this.livro()?.genero.id || ""
      })
    }
  }

  inicializarlivroFormulario() {
    this.livroFormulario = this.formBuilder.group({
      id: [''],
      titulo: [''],
      autoria: [''],
      favorito: [false],
      genero: [''],
      imagem: ['']
    })
  };

  
  emitirLivroAtualizado() {
    const livroAtualizado: Livro ={
      ...this.livroFormulario.value,
      genero : this.livroService.generos.find(x=> x.id === this.livroFormulario.value.genero)
    };

    //enviar para quem quer ouvir!
    this.submitForm.emit(livroAtualizado);
  }
}
