import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

export interface User {
  email: string;
  usd: number;
  bitcoin: number;
  ethereum: number;
  ripple: number;
  'bitcoin-cash': number;
  cardano: number;
  litecoin: number;
  nem: number;
  stellar: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  firestore = inject(Firestore);

  async register(email: string, password: string) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const userId = userCredential.user?.uid;

    const initialCapital = Math.floor(Math.random() * 99901) + 100;
    const userRef = doc(this.firestore, `users/${userId}`);
    if (userRef) {
      await setDoc(userRef, {
        email,
        usd: initialCapital,
        bitcoin: 0,
        ethereum: 0,
        ripple: 0,
        'bitcoin-cash': 0,
        cardano: 0,
        litecoin: 0,
        nem: 0,
        stellar: 0,
      });
    }
    return userCredential;
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error during login: ', error);
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  async getData(userId: string) {
    const userRef = doc(this.firestore, `users/${userId}`);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User does not exist');
    }
  }
  async logTransaction(userId: string, transactionData: any) {
    const transactionsRef = collection(
      this.firestore,
      `users/${userId}/transactions`
    );
    await addDoc(transactionsRef, {
      ...transactionData,
      date: serverTimestamp(),
    });
  }
}
