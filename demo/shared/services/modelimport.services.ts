import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Constant } from './constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise'

//import { Host } from '../models/host';//needs to be changed to content from dto class
// import {projectImport} from '../models/projectImport';
// import { API } from '../models/constants/const-api';


@Injectable()
export class ModelImportService {


    private apiUrl: string;
   
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){

        //this.apiUrl = API + 'api/ProjectImport/StartImport';  // URL to web api
        this.apiUrl='api/ModelsImport';
        //this.apiUrl='api/ProjectImp';
    }

//Create and Update method
    // postProjectImport(projectImports: projectImport,url:string): Observable<any> {
          
    //    //url=Constant.API_ENDPOINT;
    //     let bodyString = JSON.stringify(projectImports); // Stringify payload
    
    //     let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option
      
    //     //return this.http.get(this.ProjectImportApi).map(response => response.json()); 


    //                     return this.http.put(url+this.apiUrl, bodyString, options) // ...using post request
    //                     //     return this.http.put(url+this.apiUrl, bodyString, options) // ...using post request
    //                      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    //                      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    // }



    //  postModelImport(projectImports: projectImport,url:string): Observable<any> {
        
    //   // url="http://localhost:62377/";
    //    this.apiUrl='api/BizagiImport';
    //     let bodyString = JSON.stringify(projectImports); // Stringify payload
 
    //     let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option
      
    //     //return this.http.get(this.ProjectImportApi).map(response => response.json()); 


    //                     return this.http.put(url+this.apiUrl, bodyString, options) // ...using post request
    //                     //     return this.http.put(url+this.apiUrl, bodyString, options) // ...using post request
    //                      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    //                      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    // }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}