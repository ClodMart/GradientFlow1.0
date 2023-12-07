import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ConfigsService, ResponseType } from '../ConfigurationService/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class AiApiService {

  constructor(private httpClient: HttpClient, private configsService: ConfigsService) { }

  public async get<T>(url: string, params?: HttpParams, headers?: HttpHeaders, withCredentials: boolean = false, responseType?: ResponseType): Promise<T | null> {
    const responseTypeString = this.getResponsetype(responseType);
    return lastValueFrom(this.httpClient
      .get<T>(`${this.configsService.AI_API_BASE_URL}${url}`, { headers, params, withCredentials, responseType: responseTypeString }), { defaultValue: null });
  }

  public async post<T>(url: string, body?: unknown, headers?: HttpHeaders, withCredentials: boolean = false, params?: HttpParams, responseType?: ResponseType): Promise<T| null> {
    const responseTypeString = this.getResponsetype(responseType);
    headers = new HttpHeaders;  
    headers = headers?.append("Content-Type", "application/json");
    headers = headers?.append("Accept", "application/json");

    return lastValueFrom(this.httpClient
      .post<T>(`${this.configsService.AI_API_BASE_URL}${url}`, body, { headers, params, withCredentials, responseType: responseTypeString }), { defaultValue: null });
  }

  public async put<T>(url: string, body?: unknown, headers?: HttpHeaders, withCredentials: boolean = false, params?: HttpParams, responseType?: ResponseType): Promise<T| null> {
    const responseTypeString = this.getResponsetype(responseType);
    return lastValueFrom(this.httpClient
      .put<T>(`${this.configsService.AI_API_BASE_URL}${url}`, body, { headers, params, withCredentials, responseType: responseTypeString }));
  }

  public async delete<T>(url: string, params?: HttpParams, headers?: HttpHeaders, withCredentials: boolean = false, responseType?: ResponseType): Promise<T| null> {
    const responseTypeString = this.getResponsetype(responseType);
    return lastValueFrom(this.httpClient
      .delete<T>(`${this.configsService.AI_API_BASE_URL}${url}`, { headers, params, withCredentials, responseType: responseTypeString }));
  }

  private getResponsetype(responseType: ResponseType): any {
    switch (responseType) {
      case 'json':
        return 'json';
      case 'blob':
        return 'blob';
      case 'text':
        return 'text';
      case 'arraybuffer':
        return 'arraybuffer';
      default:
        return 'json';
    }
  }
}