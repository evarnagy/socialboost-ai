import { Injectable } from '@angular/core';
import { auth } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: User | null = null;

  constructor() {
    onAuthStateChanged(auth, (u) => {
      this.user = u;
    });
  }

  async register(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async logout() {
    await signOut(auth);
  }
}
