import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiServer } from '../../environments/environment';
import { Product } from '../models/Product.';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    async listar() {
        return await this.http.get<Product[]>(apiServer + 'products').toPromise()
    }
    async crear(data: Product) {
        return await this.http.post<Product>(apiServer + 'products', data).toPromise()
    }
    async actualizar(data: Product) {
        return await this.http.put<Product>(apiServer + 'products/' + data.id, data).toPromise()
    }
    async eliminar(id: number) {
        return await this.http.delete<Product>(apiServer + 'products/'+ id).toPromise()
    }
}