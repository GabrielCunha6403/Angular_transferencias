import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transferencia } from '../models/transferencia.model';

@Injectable({
  providedIn: 'root',
})
export class TransferenciaService {
  private listaTransferencia: any[];
  private url = 'http://localhost:3000/transferencias';

  constructor(private httpClient: HttpClient) {
    this.listaTransferencia = [];
  }

  get transferencias(): any[] {
    return this.listaTransferencia;
  }

  receberTransferencias(): Observable<Transferencia[]>{
    return this.httpClient.get<Transferencia[]>(this.url);
  }

  subirNovaTransferencia(transferencia: Transferencia): Observable<Transferencia> {
    this.atualizarData(transferencia);
    
    return this.httpClient.post<Transferencia>(this.url, transferencia);
  }

  atualizarData(transferencia: any) {
    transferencia.data = new Date();
  }
}
