import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileService {

 
  constructor(public http: HttpClient) { }


  uploadCarta(file: File, id) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('id', id);
    const url = environment.url + "pessoa/" + id + "/upload";
    return this._upload(url, formdata);
  }

  private _upload(url, formdata) {
    return this.http.post(url, formdata)
    .pipe(map((response: any) => response))
  }
}
