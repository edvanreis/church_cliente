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

    if (token) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Authorization': 'bearer ' + JSON.parse(token),
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
        })
      });
      return this._intercept(authReq, next);
    }
    return this._intercept(req, next);
  }

  private _intercept( req: HttpRequest<any>, next: HttpHandler){

    return next.handle(req).pipe(
      tap(evt => {
        evt
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            console.log(err)
          } catch (e) {
            console.log(e)
          }
        }
        return of(err);
      }));

  }
}
