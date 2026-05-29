/**
 * Firestore Schema & Helper Functions
 *
 * users/{uid}
 *   uid, email, displayName, photoURL, role("admin"|"user"), createdAt, updatedAt
 *
 * metrics/{docId}
 *   userId, sitespeedImprovement, satisfactionRate, customAssets, followers, connections, updatedAt
 *
 * activityLogs/{docId}
 *   userId, action, metadata, timestamp
 *
 * contactSubmissions/{docId}
 *   name, email, message, submittedAt, status("new"|"read"|"replied")
 */

import {
  doc, getDoc, setDoc, updateDoc, addDoc,
  collection, serverTimestamp, onSnapshot,
  query, where, orderBy, limit, getDocs,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
  role: "admin" | "user";
};

export async function createUserProfile(uid: string, data: Omit<UserProfile, "uid" | "role">) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { uid, ...data, role: "user", createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  await updateDoc(doc(db, "users", uid), { ...data, updatedAt: serverTimestamp() });
}

export function subscribeToMetrics(userId: string, cb: (m: Record<string, unknown> | null) => void): Unsubscribe {
  const q = query(collection(db, "metrics"), where("userId", "==", userId), limit(1));
  return onSnapshot(q, (snap) => cb(snap.empty ? null : snap.docs[0].data()));
}

export async function upsertMetrics(userId: string, data: Record<string, unknown>) {
  const q = query(collection(db, "metrics"), where("userId", "==", userId), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) {
    await addDoc(collection(db, "metrics"), { userId, ...data, updatedAt: serverTimestamp() });
  } else {
    await updateDoc(snap.docs[0].ref, { ...data, updatedAt: serverTimestamp() });
  }
}

export async function logActivity(userId: string, action: string, metadata: Record<string, unknown> = {}) {
  await addDoc(collection(db, "activityLogs"), { userId, action, metadata, timestamp: serverTimestamp() });
}

export function subscribeToActivityLogs(userId: string, cb: (logs: Record<string, unknown>[]) => void): Unsubscribe {
  const q = query(collection(db, "activityLogs"), where("userId", "==", userId), orderBy("timestamp", "desc"), limit(20));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
}

export async function submitContact(data: { name: string; email: string; message: string }) {
  await addDoc(collection(db, "contactSubmissions"), { ...data, submittedAt: serverTimestamp(), status: "new" });
}
