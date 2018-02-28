import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AngularFireDatabase, AngularFireList   } from 'angularfire2/database';
/**
 * Generated class for the EditUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {

  users: any= {
    username: "",
    age: "",
    function: "",
    key: ""
  };
  usersRef: AngularFireList<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.usersRef = this.db.list('/users');

    this.users = {
      username: this.navParams.get('name'),
      function: this.navParams.get('function'),
      age: this.navParams.get('age'),
      key: this.navParams.get('key')
      
    }
  }

  OnSubmit(form: NgForm) {
    var update_data = {
      username: form.value.username,
      function: form.value.function,
      age: form.value.age,
    };
    var key = form.value.key;
   
    this.usersRef.update(key, update_data)
    .then(x => {
      this.navCtrl.pop();
    }, (error)=> {
      console.log('Error! ', error);
    });
  }

}
