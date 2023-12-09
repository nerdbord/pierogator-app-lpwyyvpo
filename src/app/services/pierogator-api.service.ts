import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "./base-api.service";
import { DumplingRecipeInterface, DumplingRecipePostBodyInterface, DumplingRecipesResponseInterface } from "../interfaces";

@Injectable({
    providedIn: 'root',
})
export class PierogatorApiService extends BaseApiService {
    private readonly _url: string = `${this.baseUrl}/pierogator`;

    /**
     * Create new dumpling recipe
     * @param body 
     * @returns 
     */
    public postDumplingRecipes(body: DumplingRecipePostBodyInterface): Observable<void> {
        const url: string = `${this._url}/dumpling-recipes`;

        return this.httpClient.post<void>(url, body, { headers: this.baseHeaders });
    }

    /**
     * List all dumpling recipes
     * @returns dumpling recipes
     */
    public getDumplingRecipes(): Observable<DumplingRecipesResponseInterface> {
        const url: string = `${this._url}/dumpling-recipes`;

        return this.httpClient.get<DumplingRecipesResponseInterface>(url, { headers: this.baseHeaders });
    }

    /**
     * Find dumpling recipes added by me
     * @returns dumpling recipes
     */
    public getMyDumplingRecipes(): Observable<DumplingRecipesResponseInterface> {
        const url: string = `${this._url}/dumpling-recipes/me`;

        return this.httpClient.get<DumplingRecipesResponseInterface>(url, { headers: this.baseHeaders });
    }

    /**
     * Find dumpling recipe by ID
     * @param id dumpling recipe ID
     * @returns 
     */
    public getDumplingRecipeById(id: string): Observable<DumplingRecipeInterface> {
        const url: string = `${this._url}/dumpling-recipes/${id}`;

        return this.httpClient.get<DumplingRecipeInterface>(url, { headers: this.baseHeaders });
    }

    /**
     * Delete dumpling recipe by ID
     * @param id dumpling recipe ID
     */
    public deleteDumplingRecipeById(id: string): Observable<void> {
        const url: string = `${this._url}/dumpling-recipes/${id}`;

        return this.httpClient.delete<void>(url, { headers: this.baseHeaders });
    }
}