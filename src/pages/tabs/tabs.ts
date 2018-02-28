import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  displayed: boolean = true;

  constructor(private fAuth: AngularFireAuth, private navCtrl: NavController) {
    this.fAuth.auth.onAuthStateChanged(function(user) {
      if(!user) {
        this.displayed = false;
      }
    });
  }
}
