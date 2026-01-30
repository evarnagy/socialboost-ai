import { Injectable } from '@angular/core';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export type BusinessProfile = {
  industry: string;
  targetAudience: string;
  createdAt?: any;
};

@Injectable({ providedIn: 'root' })
export class ProfileService {
  async getProfile(): Promise<BusinessProfile | null> {
    const user = auth.currentUser;
    if (!user) return null;

    const ref = doc(db, 'users', user.uid, 'profile', 'main');
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as BusinessProfile) : null;
  }

  async saveProfile(industry: string, targetAudience: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('Nincs bejelentkezett felhasználó.');

    const ref = doc(db, 'users', user.uid, 'profile', 'main');
    await setDoc(ref, {
  industry,
  targetAudience,
  updatedAt: serverTimestamp(),
}, { merge: true });

  }
  
}
