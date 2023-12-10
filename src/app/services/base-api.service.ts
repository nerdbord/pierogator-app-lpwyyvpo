import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "../../environments/environment";

export abstract class BaseApiService {
    protected readonly httpClient: HttpClient = inject(HttpClient);
    protected readonly apiKey: string = environment.apiKey;
    protected readonly gptKey: string = environment.gptKey;
    protected readonly baseUrl: string = environment.apiUrl;

    protected readonly apiBaseHeaders: HttpHeaders = new HttpHeaders({
        'Authorization': this.apiKey,
        'Content-Type': 'application/json',
    });

    protected readonly gptBaseHeaders: HttpHeaders = new HttpHeaders({
        'Authorization': this.gptKey,
        'Content-Type': 'application/json',
    });
}