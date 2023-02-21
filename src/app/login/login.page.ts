import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@firebase/util';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credential: FormGroup;
  nameVal = '';
  emailVal = '';
  id: any;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private database: DatabaseService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.database.databaseConn();
    // this.id = this.activatedRoute.snapshot.paramMap.get('id');

    // this.database.getUser(this.id).then((res) => {
    //   this.passwordVal = res['password'];
    //   this.emailVal = res['email'];
    // })
  }

  get email() {
    return this.credential.get('email');
  }

  get password() {
    return this.credential.get('password');
  }

  ngOnInit() {
    this.credential = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  async login() {
    const loading = await this.toastController.create();
    await loading.present();
    const user = await this.authService.login(this.credential.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/movies', { replaceUrl: true });
    } else {
      this.showAlert('Login failed', 'Please try again!');
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
  // ionViewDidEnter() {
  //   this.database.getAllUsers()
  // }

  createUser() {
    this.database.addItem(this.nameVal, this.emailVal);
  }
}

