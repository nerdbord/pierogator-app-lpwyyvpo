import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "../../environments/environment";

export abstract class BaseApiService {
    protected readonly httpClient: HttpClient = inject(HttpClient);
    protected readonly apiKey: string = environment.apiKey;
    protected readonly baseUrl: string = environment.apiUrl;

    protected readonly baseHeaders: HttpHeaders = new HttpHeaders({
        'Authorization': this.apiKey,
        'Content-Type': 'application/json',
    });
}