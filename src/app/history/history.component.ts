import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';

interface Transaction {
  name: string;
  rut: string;
  bank: string;
  accountType: string;
  ammount: string
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{

  transactions: Transaction[] | undefined = [];

  constructor(private http:HttpClient) {
  }

  getTransactions () {
    this.http.get<Transaction[]>(`${environment.apiUrl}transaction`).subscribe((res)=>{
      this.transactions = res
    });
  }

  ngOnInit() {
    this.getTransactions()
  }
}
