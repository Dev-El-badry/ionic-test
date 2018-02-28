import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

	user= {
		username: '',
		pword: '',
		age: '',
		function: ''
	}

  constructor(
  	public navCtrl: NavController,
  	private db: AngularFireDatabase,
  	private alertCtrl: AlertController
  	) {

  }

  ngOnInit() {
  	this.restForm();
  }

  restForm(usersForm?: NgForm) {
  	if(usersForm!=null)
  		usersForm.reset();

  	this.user = {
  		username: "",
  		pword: "",
  		age: "",
  		function: ""
  	}
  }

  OnSubmit(form: NgForm) {
  	this.db.list('/users').push(form.value)
  	.then(res=> {
  		this.navCtrl.push(HomePage);
  		this.restForm();
  	}, error =>{
  		console.log('Error! ',error);
  	})
  }

  editUser(update_id) {
  	console.log(update_id);
  }

  presentConfirm(update_id) {
  	this.alertCtrl.create({
  		title: "Delete Alert",
  		message: "Are You Sure To Delete Alert ?",
  		buttons: [
  			{
  				text: 'Cancel',
  				role: 'cancel',
  				handler: ()=> {
  					console.log('Cancel Clicked');
  				}
  			},
  			{
  				text: 'Yes',
  				handler: ()=> {
  					console.log('Id: ', update_id);
  				}
  			}
  		]
  	});
  }

  deleteConif(update_id) {
  	this.presentConfirm(update_id);
  }

}
