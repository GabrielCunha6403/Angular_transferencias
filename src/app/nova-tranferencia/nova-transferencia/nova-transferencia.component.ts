import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Transferencia } from 'src/app/models/transferencia.model';
import { TransferenciaService } from 'src/app/services/transferencia.service';

@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss'],
})
export class NovaTransferenciaComponent implements OnInit {
  @Output() aoTransferir: EventEmitter<any> = new EventEmitter<any>();

  valor: number;
  destino: number;

  constructor(private service: TransferenciaService, private router: Router) {}

  fazerTransferencia(): void {
    console.log('Transferência solicitada');
    const valorEmitir: Transferencia = {
      id: 0,
      valor: this.valor,
      destino: this.destino,
      data: new Date(),
    };
    this.service.subirNovaTransferencia(valorEmitir).subscribe(
      (transferencia) => {
        console.log(transferencia);
        this.limparCampos();
        this.router.navigateByUrl('extrato');
      },
      (error) => console.log(error)
    );
  }

  limparCampos(): void {
    this.valor = 0;
    this.destino = 0;
  }

  ngOnInit(): void {}
}
