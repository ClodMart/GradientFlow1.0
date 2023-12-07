import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


export interface IApiConfig{
    BASE_URL:string,
    SIGNALR_URL: string,
    AI_API_BASE_URL: string,
    AI_API_SIGNALR_URL: string
}

export type ResponseType = 'json'|'blob'|'text'|'arraybuffer'| undefined

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  private _configs: IApiConfig;

  public get configs(): IApiConfig {
    return this._configs;
  }

  public get BASE_URL(): string {
    return this._configs.BASE_URL;
  }

  public get SIGNALR_URL(): string {
    return this._configs.SIGNALR_URL;
  }

  public get AI_API_BASE_URL(): string {
    return this._configs.AI_API_BASE_URL;
  }

  public get AI_API_SIGNALR_URL(): string {
    return this._configs.AI_API_SIGNALR_URL;
  }


  constructor(private httpClient: HttpClient) { }

  public async init(): Promise<IApiConfig> {

    const filePath = 'assets/api-config.json';
    let data = this.httpClient.get(filePath).subscribe(x=> this.loadConfigs(x))
    //let jsonObj = JSON.parse(data); // string to "any" object first
    
    // return this.httpClient
    //   .get<IApiConfig>(`${filePath}`, { headers: { 'Cache-Control': 'no-cache' }, observe: 'response', responseType: 'json' })
    //   .pipe(
    //     map(response => {
    //       this._configs = response.body ?? {
    //         BASE_URL: "",
    //         SIGNALR_URL: "",
    //         AI_API_BASE_URL: "",
    //         AI_API_SIGNALR_URL: ""
    //       };
          return this._configs;
    }


    private loadConfigs(configs: Object){
        this._configs = configs as IApiConfig;
    }
}