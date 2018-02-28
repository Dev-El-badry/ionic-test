import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, private fAuth: AngularFireAuth) {

  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  loginWithFacebook() {
    this.fAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res=> {
      console.log(res);
    });
  }

  signout() {
    this.fAuth.auth.signOut().then(res=> {
      this.navCtrl.push(LoginPage);
    }, (error)=> {
      console.log('Error! ', error);
    });
  }

}
