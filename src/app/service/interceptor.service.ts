import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpRequest, HttpHandler, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../model/alert-type';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private _tokenService: TokenService, private _notifierService: NotifierService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this._tokenService.retrieveToken();
    if (token) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Authorization': 'bearer ' + JSON.parse(token)
        })
      });
      return this._intercept(authReq, next);
    }
    return this._intercept(req, next);
  }

  private _intercept( req: HttpRequest<any>, next: HttpHandler){

    return next.handle(req).pipe(
      tap(evt => {
        evt;
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            if (!err.status) {
              this._notifierService.notify(AlertType.Error, "O Serviço está indisponível. Entre em contato com o Suporte Técnico!");
            } else if (err.status === 401) {
              this._notifierService.notify(AlertType.Error, "Faça o login para acessar este serviço!");
            } else if (err.status === 404) {
              this._notifierService.notify(AlertType.Error, "Serviço não localizado!");
            } else if (err.error.message) {
              this._notifierService.notify(AlertType.Error, err.error.message);
            }
          } catch (e) {
            this._notifierService.notify(AlertType.Error, "Erro ao carregar a aplicação");
          }
        }
        return of(err);
      }));

    // return next.handle(req).pipe(
    //   tap(evt => {
    //     if (evt instanceof HttpResponse) {
    //       if (evt.body && evt.body.success){
    //         console.log(evt.body);
    //       }
    //     }
    //   }),
    //   catchError((err: any) => {
    //     if (err instanceof HttpErrorResponse) {
    //       try {
    //         if( err.error.message ){
    //         }
    //       } catch (e) {
    //         console.log(e)
    //       }
    //     }
    //     return of(err);
    //   }));

  }
}
