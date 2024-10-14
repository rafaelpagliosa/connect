import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicoMusicService {
  private baseUrl = 'https://musicbrainz.org/ws/2';


  constructor(private http: HttpClient) { }

  // Função para buscar faixas de música
  buscarMusicas(query: string): Observable<any> {
    const params = new HttpParams()
      .set('query', query) // Consulta de busca
      .set('fmt', 'json'); // Formato da resposta

    return this.http.get<any>(`${this.baseUrl}/recording`, { params });
  }

  // Função para buscar artistas
  buscarArtistas(query: string): Observable<any> {
    const params = new HttpParams()
      .set('query', query) // Consulta de busca
      .set('fmt', 'json'); // Formato da resposta

    return this.http.get<any>(`${this.baseUrl}/artist`, { params });
  }


}
