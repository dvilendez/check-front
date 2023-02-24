import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import FormUtils from '../../utils/form.utils'

interface Address {
  name: string;
  rut: string;
  email: string;
  phone: string;
  bank: string;
  accountType: string;
  accountNumber: number
}
@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  form: FormGroup = new FormGroup({
    ammount: new FormControl(''),
  });
  submitted = false;
  addresses: Address[] = [];
  selectedAddress: Address | undefined;
  creationVisible = false;
  creationMsg = '';
  creationState = '';
  addressVisible =false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {}

  getAddresses() {
    this.http.get<Address[]>(`${environment.apiUrl}address`).subscribe(response => {
      this.addresses = response;
    })
  }

  onChangeAddress(event: any) {
    console.log(event.target.value.name)
    this.selectedAddress = event.target.value;
  }

  doTransaction() {
    this.http.post<any>(`${environment.apiUrl}transaction`, {
      rut: this.selectedAddress?.rut,
      name: this.selectedAddress?.name,
      bank: this.selectedAddress?.bank,
      accountType: this.selectedAddress?.accountType,
      ammount: parseInt(this.form.controls['ammount'].value),
    }).pipe(catchError((response) => of(response.error)))
    .subscribe(response => {
      this.creationVisible = true;
      if (!response.success) {
        this.creationMsg = response.message;
        this.creationState = 'danger';
        return
      }
      this.creationState = 'success';
      this.creationMsg = 'Transferencia realizada exitosamente! 💸';
      FormUtils.resetForm(this.form, this.f);
    })
  }

  ngOnInit(): void {
    this.getAddresses();
    this.form = this.formBuilder.group(
      {
        ammount:  ['', [Validators.required, Validators.min(1)]],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    FormUtils.checkEmpty(this.form, this.f);
    console.log(this.form.invalid)
    console.log(!this.selectedAddress)
    if (!this.selectedAddress) {
      this.addressVisible = true
    }
    if (this.form.invalid || !this.selectedAddress) {
      return;
    }
    this.addressVisible = false;

    this.doTransaction()
  }
}
