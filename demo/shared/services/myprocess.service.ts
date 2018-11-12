import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise'
import { MyProcessObject } from '../../../shared/models/MyProcessObject';
import { MergeObject } from '../../../shared/models/MergeObject';

@Injectable()
export class MyProcessObjectService {


    private apiUrl: string;
   
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){

        //this.apiUrl = API + 'api/ProjectImport/StartImport';  // URL to web api
        this.apiUrl='api/ModelsImport';
        //this.apiUrl='api/ProjectImp';
    }

    getCustomAttributes(username,password,modelid,webservice, hostUrl ): Promise<MyProcessObject[]> {
        debugger;
        //var hostUrl="http://localhost/QPR"
        let callURL = hostUrl + "api/MyProcess?username="+username+"&password="+password+"&modelid="+modelid+"&webServiceURL="+webservice;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(callURL)
        .toPromise()
        .then(response => response.json() as MyProcessObject[])
        .catch(this.handleError);
        } 

        

        //api/QPRQueryObjectXML
    
    postMyProcessObject(queryObject: MyProcessObject,url:string): Observable<any> {
        debugger;
    url="http://localhost/QPR";
    this.apiUrl='api/MyProcess';
    let bodyString = JSON.stringify(queryObject); // Stringify payload
 
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option
 
    return this.http.put(url+this.apiUrl, bodyString, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }


    // getCustom(username,password,modelid,webservice, hostUrl ): Promise<string[]> {
    //     debugger;
    //     //var hostUrl="http://localhost/QPR"
    //     let callURL = hostUrl + "api/Organization?username="+username+"&password="+password+"&modelid="+modelid+"&webServiceURL="+webservice;
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get(callURL)
    //     .toPromise()
    //     .then(response => response.json() as string[])
    //     .catch(this.handleError);
    //     } 

    //     postOrganizationUnitObject(queryObject: MyProcessObject,url:string): Observable<any> {
    //         debugger;
    //     url="http://localhost/QPR";
    //     this.apiUrl='api/Organization';
    //     let bodyString = JSON.stringify(queryObject); // Stringify payload
     
    //     let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option
     
    //     return this.http.put(url+this.apiUrl, bodyString, options) // ...using post request
    //                          .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    //                           .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    //     }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}