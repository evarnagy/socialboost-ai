import { Injectable } from '@angular/core';
import { auth, db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  Timestamp
} from 'firebase/firestore';

export type FavoriteIdea = {
  id: string;
  text: string;
  createdAt?: Timestamp;
};

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  async addFavorite(text: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('Nincs bejelentkezett felhasználó.');

    const colRef = collection(db, 'users', user.uid, 'favorites');
    await addDoc(colRef, {
      text,
      createdAt: serverTimestamp(),
    });
  }

  async listFavorites(): Promise<FavoriteIdea[]> {
    const user = auth.currentUser;
    if (!user) return [];

    const colRef = collection(db, 'users', user.uid, 'favorites');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as any),
    })) as FavoriteIdea[];
  }
  
  async removeFavorite(favoriteId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('Nincs bejelentkezve.');

  const ref = doc(db, 'users', user.uid, 'favorites', favoriteId);
  await deleteDoc(ref);
}
}
