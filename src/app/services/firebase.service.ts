import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilService } from './util.service';
import {
  getAuth,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private utilSvc: UtilService
  ) {}

  //autenticacion

  login() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    return signInWithPopup(auth, provider);
  }

  updateUser(user: any) {
    const auth = getAuth();
    return updateProfile(auth.currentUser, user);
  }

  getAuthState() {
    return this.auth.authState;
  }

  async signOut() {
    await this.auth.signOut();
    this.utilSvc.routerLink('/tabs/home');
    localStorage.removeItem('user');
  }

  // firabase Base de datos

  getCollection(collectionName: string) {
    return this.db.collection(collectionName).valueChanges({ idField: 'id' });
  }

  getCollectionWhere(collectionName: string, where: string, whereValue: any): Observable<any[]> {
    return this.db.collection(collectionName, ref => ref.where(where, '==', whereValue)).valueChanges({ idField: 'id' });
  }

  // Método para agregar un documento a una colección en lugar de una subcolección
  addDocument(collectionName: string, object: any) {
    return this.db.collection(collectionName).add(object);
  }

  getSubcollecion(path: string, subCollectionName: string) {
    return this.db
      .doc(path)
      .collection(subCollectionName)
      .valueChanges({ idField: 'id' });
  }

  routineAlreadyExist(routine_id: string, user_id: string): Observable<boolean> {
    // Primero, obtén todas las rutinas del usuario
    return this.getSubcollecion(`users/${user_id}`, 'routines').pipe(
      map((routines: any[]) => {
        // Verifica si la rutina con el ID dado ya existe
        return routines.some(routine => routine.id === routine_id);
      })
    );
  }

  addSubcollecion(path: string, subCollectionName: string, object: any) {
    return this.db.doc(path).collection(subCollectionName).add(object);
  }

  updateSubDocument(collectionName: string, documentId: string, subCollectionName: string, subDocumentId: string, object: any) {
    return this.db
      .collection(collectionName)
      .doc(documentId)
      .collection(subCollectionName)
      .doc(subDocumentId)
      .update(object);
  }

  // Método para actualizar un documento en una colección en lugar de una subcolección
  updateDocument(collectionName: string, documentId: string, object: any) {
    return this.db.collection(collectionName).doc(documentId).update(object);
  }

  // Método para eliminar un documento de una colección en lugar de una subcolección
  deleteDocument(collectionName: string, documentId: string) {
    return this.db.collection(collectionName).doc(documentId).delete();
  }
}
