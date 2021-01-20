import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

formateur:any;
formateurNom:string;
formateurPrenom:string;
formateurEmail:string;
formateurCin:number;
formateurTelephone:number;
formateurTarif:string;
formateurPhoto:string;
formateurCV:string;
formateurSpecialite:string;
formateurPassword:string;
message:string;


  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService : FirebaseService) {}

  ngOnInit(){
    this.firebaseService.get_Formateur().subscribe(data =>{
      this.formateur= data.map(e =>{
        return{
          id: e.payload.doc.id,
          isedit:false,
          nom:e.payload.doc.data()['nom'],
          prenom:e.payload.doc.data()['prenom'],
          email:e.payload.doc.data()['email'],
          cin:e.payload.doc.data()['cin'],
          telephone:e.payload.doc.data()['telephone'],
          tarif:e.payload.doc.data()['tarif'],
          photo:e.payload.doc.data()['photo'],
          cv:e.payload.doc.data()['cv'],
          specialite:e.payload.doc.data()['specialite'],
          password:e.payload.doc.data()['password'],
       
           };
      })
      console.log(this.formateur);
    });
  }
logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  } 

  createFormateur()
  {
    let Formateur= {};
    Formateur['nom']= this.formateurNom;
    Formateur['prenom']= this.formateurPrenom;
    Formateur['email']= this.formateurEmail;
    Formateur['cin']= this.formateurCin;
    Formateur['telephone']= this.formateurTelephone;
    Formateur['tarif']= this.formateurTarif;
    Formateur['photo']= this.formateurPhoto;
    Formateur['cv']= this.formateurCV;
    Formateur['specialite']= this.formateurSpecialite;
    Formateur['password']= this.formateurPassword;

    this.firebaseService.create_Newformateur(Formateur).then(res => {
  
      this.formateurNom="";
      this.formateurPrenom="";
      this.formateurEmail="";
      this.formateurCin=undefined;
      this.formateurTelephone=undefined;
      this.formateurTarif="";
      this.formateurPhoto="";
      this.formateurCV="";
      this.formateurSpecialite="";
      this.formateurPassword="";
console.log(res);
this.message ="Formateur data save done"
 }).catch(error =>{
  console.log(error);
 });

  }

  EditFormateur(Formateur){
    Formateur.isedit = true;
    Formateur.editcin= Formateur.cin; 
    Formateur.editnom= Formateur.nom;
    Formateur.editprenom= Formateur.prenom;
    Formateur.editemail= Formateur.email;
    Formateur.edittelephone= Formateur.telephone;
    Formateur.edittarif= Formateur.tarif;
    Formateur.editphoto= Formateur.photo;
    Formateur.editcv= Formateur.cv;
    Formateur.editspecialite= Formateur.specialite;
    Formateur.editpassword= Formateur.password;
  }


  Updataformateur(formateurdata){
    let formateur= {};
    formateur['cin']= formateurdata.editcin;
    formateur['nom']= formateurdata.editnom;
    formateur['prenom']= formateurdata.editprenom;
    formateur['email']= formateurdata.editemail;
    formateur['telephone']= formateurdata.edittelephone;
    formateur['tarif']= formateurdata.edittarif;
    formateur['photo']= formateurdata.editphoto;
    formateur['cv']= formateurdata.editcv;
    formateur['specialite']= formateurdata.editspecialite;
    formateur['password']= formateurdata.editpassword;
this.firebaseService.update_formateur(formateurdata.id, formateur);
formateurdata.isedit = false;

  }


  DeleteFormateur(formateur_id)
  {
    this.firebaseService.delete_formateur(formateur_id);
  }

}
