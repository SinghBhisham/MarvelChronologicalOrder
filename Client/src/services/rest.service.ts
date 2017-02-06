import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RestService {
  private baseUrl = '/marvel';  // URL to web API
  constructor (private http: Http) {}
  getComicsByCharacter(p: any): Observable<any []> {
      let url = this.baseUrl + "/comics/searchbycharacter";//should be from a config
      let params = new URLSearchParams();
      for (let i = 0; i < p.query.length; i++){
        params.set("q["+ i + "]", p.query[i]);
      }
      //params.set('q', p.query); // the user's search value
      params.set('op', p.op);
    params.set('callback', 'JSONP_CALLBACK');
    return this.http.get(url  , {search: params})
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getCharactersByComic(p: any): Observable<any []> {
      let url = this.baseUrl + "/characters/searchbycomics";
      let params = new URLSearchParams();
      for (let i = 0; i < p.query.length; i++){
        params.set("q["+ i + "]", p.query[i]);
      }
      //params.set('q', p.query); // the user's search value
      params.set('op', p.op);
    params.set('callback', 'JSONP_CALLBACK');
    return this.http.get(url  , {search: params})
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getTopComicsByCharacter(p: any): Observable<any []> {
      let url = this.baseUrl + "/topcomics/bycharacter";
      let params = new URLSearchParams();
      //params.set('q', p.query); // the user's search value
      params.set('limit', p.limit);
    params.set('callback', 'JSONP_CALLBACK');
    return this.http.get(url  , {search: params})
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getTopComicsByAlias(p: any): Observable<any []> {
      let url = this.baseUrl + "/topcomics/byaliases";
      let params = new URLSearchParams();
      //params.set('q', p.query); // the user's search value
      params.set('limit', p.limit);
    params.set('callback', 'JSONP_CALLBACK');
    return this.http.get(url  , {search: params})
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getTopCharactersByComic(p: any): Observable<any []> {
      let url = this.baseUrl + "/topcharacters";
      let params = new URLSearchParams();
      //params.set('q', p.query); // the user's search value
      params.set('limit', p.limit);
    params.set('callback', 'JSONP_CALLBACK');
    return this.http.get(url  , {search: params})
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
