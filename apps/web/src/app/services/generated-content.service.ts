import { Injectable } from '@angular/core';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Idea, StructuredPost } from '../pages/ideas/ideas.service';
import { PlanItem } from './planner.service';

export type GeneratedIdeasDoc = {
  ideas: Idea[];
  post: StructuredPost | null;
};

export type GeneratedPlanDoc = {
  plan: PlanItem[];
};

export type GeneratedImageDoc = {
  imageUrl: string;
};

@Injectable({ providedIn: 'root' })
export class GeneratedContentService {
  private docRef(name: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('Nincs bejelentkezett felhasználó.');
    return doc(db, 'users', user.uid, 'generated', name);
  }

  // --- Ideas ---

  async saveIdeas(data: GeneratedIdeasDoc): Promise<void> {
    await setDoc(this.docRef('ideas'), { ...data, updatedAt: serverTimestamp() });
  }

  async loadIdeas(): Promise<GeneratedIdeasDoc | null> {
    try {
      const snap = await getDoc(this.docRef('ideas'));
      if (!snap.exists()) return null;
      return snap.data() as GeneratedIdeasDoc;
    } catch {
      return null;
    }
  }

  // --- Planner ---

  async savePlan(data: GeneratedPlanDoc): Promise<void> {
    await setDoc(this.docRef('plan'), { ...data, updatedAt: serverTimestamp() });
  }

  async loadPlan(): Promise<GeneratedPlanDoc | null> {
    try {
      const snap = await getDoc(this.docRef('plan'));
      if (!snap.exists()) return null;
      return snap.data() as GeneratedPlanDoc;
    } catch {
      return null;
    }
  }

  // --- Image ---

  async saveImage(data: GeneratedImageDoc): Promise<void> {
    await setDoc(this.docRef('image'), { ...data, updatedAt: serverTimestamp() });
  }

  async loadImage(): Promise<GeneratedImageDoc | null> {
    try {
      const snap = await getDoc(this.docRef('image'));
      if (!snap.exists()) return null;
      return snap.data() as GeneratedImageDoc;
    } catch {
      return null;
    }
  }
}
