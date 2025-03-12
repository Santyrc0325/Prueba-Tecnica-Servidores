import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private apiUrl = 'http://localhost:3030/api/servers';

  constructor(private http: HttpClient) {}

  getServers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getServerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addServer(server: any): Observable<any> {
    return this.http.post(this.apiUrl, server);
  }

  updateServer(id: number, server: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, server);
  }

  deleteServer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  changeServerStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }
}
