import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList   } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { EditUserPage } from '../edit-user/edit-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usersRef: AngularFireList<any[]>;
  users: Observable<any[]>;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase,private alertCtrl: AlertController, private fAuth: AngularFireAuth) {
    this.usersRef = this.db.list('/users');
    this.users = this.usersRef.snapshotChanges().map(changes=>{
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });

    this.fAuth.auth.onAuthStateChanged(function(user) {
      if(!user) {
        navCtrl.setRoot(LoginPage);
      }
    });
    
  }



  editUser(data) {
    
    this.navCtrl.push(EditUserPage, {
      name: data[0],
      function: data[1],
      age: data[2],
      key: data[3]
    });
  }

  deleteConif(update_id) {
    this.usersRef.remove(update_id);
  }

  showConfirm(update_id) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Alert',
      message: 'Are You Sure To delete This is User? ',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.deleteConif(update_id);
          }
        }
      ]
    });
    confirm.present();
  }
}


