import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpRequest, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private _tokenService: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    return Observable.fromPromise(this.handleAccess(request, next));
    // const token = this._tokenService.retrieveToken();

    // if (token) {
    //   const authReq = req.clone({
    //     headers: new HttpHeaders({
    //       'Authorization': 'bearer ' + JSON.parse(token),
    //       'Cache-Control': 'no-cache',
    //       'Pragma': 'no-cache',
    //       'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    //     })
    //   });
    //   return this._intercept(authReq, next);
    // }
    // return this._intercept(req, next);
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
  Promise<HttpEvent<any>> {
    const token = await this._tokenService.retrieveToken();
    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: {[name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if ( token && this._tokenService.isTokenExpired() ) {
      //
    }

    if ( token ) {
      headerSettings['Authorization'] = 'Bearer ' + JSON.parse(token);
    }
    // headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({headers: newHeader});
    
    return next.handle(changedRequest).toPromise();
  }

  // private _intercept( req: HttpRequest<any>, next: HttpHandler){

  //   return next.handle(req).pipe(
  //     tap(evt => {
  //       evt
  //     }),
  //     catchError((err: any) => {
  //       console.log(err)
  //       return of(err);
  //     }));

  // }
}
