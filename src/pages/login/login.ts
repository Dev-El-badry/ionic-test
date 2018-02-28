import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private fAuth: AngularFireAuth) {
  }
  data = {
    Email: "",
    Password: ""
  }

  ngOnInit() {
  	this.restForm();
  }

  restForm(usersForm?: NgForm) {
  	if(usersForm!=null)
  		usersForm.reset();

      this.data = {
        Email: "",
        Password: ""
      }
  }

  OnSubmit(form: NgForm) {
    this.fAuth.auth.signInWithEmailAndPassword(form.value.Email, form.value.Password)
    .then(x=> {
      this.restForm();
      this.navCtrl.push(HomePage);
    });
  }
}
