import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, onSnapshot, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IncomeExpenses } from '../models/income-expenses.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpensesService {

  constructor(
    private firestore: Firestore,
    private _AuthService: AuthService,
    ) { }

  createIncomeExpenses(incomeExpenses: IncomeExpenses) {
    let { uid, ...incExpButUid } = incomeExpenses;
    const uidUser = this._AuthService.user?.uid;
    
    return addDoc(
      collection(this.firestore, `${uidUser}/income-expenses/items`),
      {...incExpButUid}
    );
  }

  initIncomeExpensesListener(uid: string) {
    return new Observable( observer => {
      onSnapshot(
        collection(this.firestore, `${uid}/income-expenses/items`),
        (docRef) => {
          let items: any[] = [];
          docRef.forEach((doc) => {
            console.log('doc.data()', doc.data());
            
            let { amount, description, type } = doc.data();
            let item:any = { amount, description, type, uid: doc.id };
            items.push(item);
          });
          observer.next(items);
        },
        error => {
          console.log(error)
          observer.error(error);
        }
      );
    })
  }

  deleteIncomeExpenses(uidItem?: string) {
    const uidUser = this._AuthService.user?.uid;
    return deleteDoc(doc(this.firestore, `${uidUser}/income-expenses/items/${uidItem}`));
  }

}
