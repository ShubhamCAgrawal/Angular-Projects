import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  emailVal = '';
  passwordVal = '';
  today: any;
  yearValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  credential: FormGroup;
  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController,
    private database: DatabaseService
    // this.today = new Date().toISOString()
  ) {
    this.database.databaseConn();
  }

  ngOnInit() {
    this.credential = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', [Validators.required,]],
    });
  }

  get name() {
    return this.credential.get('name');
  }
  get phone() {
    return this.credential.get('phone');
  }
  get password() {
    return this.credential.get('password');
  }
  get address() {
    return this.credential.get('address');
  }
  get email() {
    return this.credential.get('email');
  }

  async register() {
    const loading = await this.toastController.create();
    await loading.present();
    const user = await this.authService.register(this.credential.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/movies', { replaceUrl: true });


    } else {
      this.showAlert('Registration failed', 'Please try again!');
    }
  }

  async showAlert(header, message) {
    const alert = await this.toastController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  createUser() {
    this.database.addItem(this.passwordVal, this.emailVal);
  }
}
