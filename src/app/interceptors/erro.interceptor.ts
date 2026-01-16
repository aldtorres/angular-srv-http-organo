import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MensagemErroService } from '../services/mensagem-erro.service';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  //req => REQUEST, 
  // next => PROXIMA ETAPA
  //return next(req);
  
  const mensagemDeService = inject(MensagemErroService)

  return next(req).pipe(
    catchError((erro: HttpErrorResponse) => {
      //const mensagemErro = 'Ops, ocorreu um erro - prego -Interceptor'
      const mensagemErro = obterMensagemDeErro(erro.status)
      console.log(mensagemErro)
      mensagemDeService.mostrarMensagemDeErro(mensagemErro)
      return throwError(() => erro)
    })
  );
};

function obterMensagemDeErro(status: number): string{

  const mensagensDeErro: Record<number, string> ={
    0: 'Erro de rede - Não foi possível se conectar ao servidor',
    404: 'Recurso solicitado não encontrado',
    500: 'Erro no servidor. Tente novamente mais tarde'
  }
  return mensagensDeErro[status] || 'Ocorreu um erro inesperado!'
}


