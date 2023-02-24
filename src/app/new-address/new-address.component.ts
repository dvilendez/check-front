import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from './utils/validation';
import { environment } from '../../environments/environment';
import { catchError, of } from 'rxjs';
import { RutService } from 'rut-chileno';
import FormUtils from '../../utils/form.utils'

interface Bank {
  code: string;
  name: string;
}

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent implements OnInit {
  form: FormGroup = new FormGroup({
    rut: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    bank: new FormControl(''),
    accountType: new FormControl(''),
    accountNumber: new FormControl(''),
  });
  submitted = false;
  banks : Bank[] = []
  creationVisible = false
  creationMsg = ''
  creationState = ''
  ngClass: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private rutService: RutService
  ) {}

  getBanks() {
    this.http.get<Bank[]>(`${environment.apiUrl}bank`).subscribe(response => {
      this.banks = response;
      console.log(this.banks);
    })
  }

  createAddress() {
    try {
      this.creationVisible = false;
      this.creationMsg = '';
      this.creationState = '';

      this.http.post<any>(`${environment.apiUrl}address`, {
        rut: this.form.controls['rut'].value,
        name: this.form.controls['name'].value,
        email: this.form.controls['email'].value,
        phone: this.form.controls['phone'].value,
        bank: this.form.controls['bank'].value,
        accountType: this.form.controls['accountType'].value,
        accountNumber: parseInt(this.form.controls['accountNumber'].value),
      }).pipe(catchError((response) => of(response.error)))
      .subscribe(response => {
        this.creationVisible = true;
        if (!response.success) {
          this.creationMsg = response.message;
          this.creationState = 'danger';
          return
        }
        this.creationState = 'success';
        this.creationMsg = 'Destinatario creado exitosamente! 🎉';
        FormUtils.resetForm(this.form, this.f);
      })
    } catch (error) {
      console.log(error)
    }

  }

  ngOnInit(): void {
    this.getBanks();
    this.form = this.formBuilder.group(
      {
        rut:  ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        phone: ['', Validators.required],
        bank: ['', Validators.required],
        accountType: ['', Validators.required],
        accountNumber: ['', Validators.required]
      },
      {
        validators: [Validation.validRut()]
      }
    );
  }

  formatRut(event: any) {
    const rut = event.target.value;
    if (rut.length > 1) {
      this.form.get("rut")?.setValue(this.rutService.rutFormat(event.target.value));
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    FormUtils.checkEmpty(this.form, this.f);
    if (this.form.invalid) {
      return;
    }

    this.createAddress()

  }
}
