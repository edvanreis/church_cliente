import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpRequest, HttpHandler, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private _tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this._tokenService.retrieveToken();
    // console.log("token");
    // console.log(token);
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
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success){
            console.log(evt.body);
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            if( err.error.message ){
            }else{
            }
            console.log(err)
          } catch (e) {
            console.log(e)
          }
        }
        return of(err);
      }));

  }
}
