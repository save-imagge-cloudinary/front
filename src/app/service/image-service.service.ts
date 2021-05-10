import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  private readonly url = `${environment.baseUrl}/cloudinary`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getList(): Observable<Response> {
    return this.http.get(`${this.url}/list`);
  }

  upload(image: File): Observable<Response> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.http.post(`${this.url}/upload`, formData);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}
