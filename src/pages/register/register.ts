import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private fAuth: AngularFireAuth) {
  }

  data = {
    Email: "",
    Password: ""
  }

  restForm(usersForm?: NgForm) {
  	if(usersForm!=null)
  		usersForm.reset();

      this.data = {
        Email: "",
        Password: ""
      }
  }

  OnSubmit(form? :NgForm) {
    this.fAuth.auth.createUserWithEmailAndPassword(form.value.Email, form.value.Password)
    .then(res=>{
      this.restForm();
      this.navCtrl.push(LoginPage);

    });
  }

}