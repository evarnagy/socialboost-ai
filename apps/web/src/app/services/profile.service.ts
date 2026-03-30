import { Injectable } from '@angular/core';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export type SocialPlatform = 'instagram' | 'twitter' | 'linkedin' | 'facebook';
export type ContentGoal = 'engagement' | 'lead' | 'sales' | 'awareness';
export type BrandTone = 'friendly' | 'expert' | 'premium';

export type BusinessProfile = {
  industry: string;
  targetAudience: string;
  location?: string;
  ageRange?: string;
  preferredPlatform?: SocialPlatform;
  contentGoal?: ContentGoal;
  brandTone?: BrandTone;
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

  async saveProfile(profile: BusinessProfile): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('Nincs bejelentkezett felhasználó.');

    const ref = doc(db, 'users', user.uid, 'profile', 'main');
    await setDoc(ref, {
      industry: profile.industry,
      targetAudience: profile.targetAudience,
      location: profile.location ?? '',
      ageRange: profile.ageRange ?? '',
      preferredPlatform: profile.preferredPlatform ?? 'instagram',
      contentGoal: profile.contentGoal ?? 'engagement',
      brandTone: profile.brandTone ?? 'friendly',
      updatedAt: serverTimestamp(),
    }, { merge: true });

  }
  
}
