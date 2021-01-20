import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

isLoggedIn= false;

  constructor(public firebaseAuth:AngularFireAuth,public fireservices:AngularFirestore) { }
async signin(email:string,password:string){
  await this.firebaseAuth.signInWithEmailAndPassword(email,password)
  .then(res=>{
    this.isLoggedIn = true
    localStorage.setItem('user',JSON.stringify(res.user))
  })
}



logout(){
  this.firebaseAuth.signOut()
  localStorage.removeItem('user')
}

create_Newformateur(Formateur){
return this.fireservices.collection('Formateurs').add(Formateur);
}



get_Formateur(){
  return this.fireservices.collection('Formateurs').snapshotChanges();
}



update_formateur(formateurid, formateur)
{
  this.fireservices.doc('Formateurs/' + formateurid).update(formateur);

}


delete_formateur(formateur_id)
  {
    this.fireservices.doc('Formateurs/' + formateur_id).delete();
  }










}
