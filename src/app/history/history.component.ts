import { Component } from '@angular/core';

interface Transaction {
  name: string;
  rut: string;
  bank: string;
  accountType: string;
  ammount: string
}

const TRANSACTIONS: Transaction[] = [
  {
    name: 'Cosme Fulanito',
    rut: '11.111.111-1',
    bank: 'Ripley',
    accountType: 'Corriente',
    ammount: '$10.000.000',
  }
]

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  transactions = TRANSACTIONS;
}
