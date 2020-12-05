// See: https://firebase.google.com/docs/rules/unit-tests?hl=ja
import {
  initializeDB,
  fbAssertFails,
  fbAssertSucceeds,
  deleteFirebaseApps,
  clearFirestoreData,
} from './helpers/firebase-helper';
import { writeSingleDocument } from './helpers/firebase-admin-helper';

describe('Jest動作確認テスト', () => {
  afterAll(async () => {
    // Rest test data after finishing this test.
    await clearFirestoreData();
    await deleteFirebaseApps();
  });

  it('Can read items in the readonly collection', async () => {
    const db = initializeDB();
    const testDoc = db.collection('readonly').doc('testDoc');
    await fbAssertSucceeds(testDoc.get());
  });

  it('Cannot write items in the readonly collection', async () => {
    const db = initializeDB();
    const testDoc = db.collection('readonly').doc('testDoc2');
    await fbAssertFails(testDoc.set({ hoge: 'fuga' }));
  });

  it('Can write to a user document with the same ID as our user', async () => {
    const uid = 'test_user';
    const db = initializeDB({
      uid,
      email: 'test_user@example.com',
    });
    const testDoc = db.collection('users').doc(uid);
    await fbAssertSucceeds(testDoc.set({ foo: 'bar' }));
  });

  it('Cannot write to a user document with the different ID as our user', async () => {
    const uid = 'test_user';
    const db = initializeDB({
      uid,
      email: 'test_user@example.com',
    });
    const testDoc = db.collection('users').doc(uid + 'with_wrong_id');
    await fbAssertFails(testDoc.set({ foo: 'bar' }));
  });

  it('Can read posts marked public', async () => {
    const db = initializeDB();
    const testQuery = db
      .collection('posts')
      .where('visibility', '==', 'public');
    await fbAssertSucceeds(testQuery.get());
  });

  it('Can query personal posts', async () => {
    const uid = 'test_user';
    const db = initializeDB({
      uid,
      email: 'test@example.com',
    });
    const testQuery = db.collection('posts').where('authorId', '==', uid);
    await fbAssertSucceeds(testQuery.get());
  });

  it('Cannot query all posts', async () => {
    const uid = 'test_user';
    const db = initializeDB({
      uid,
      email: 'test@example.com',
    });
    const testQuery = db.collection('posts');
    await fbAssertFails(testQuery.get());
  });

  it('Can read a single public post', async () => {
    const collection = 'posts';
    const documentId = 'public_post';
    const data = {
      authorId: 'any_id',
      visibility: 'public',
    };

    await writeSingleDocument({
      collection,
      documentId,
      data,
    });

    const db = initializeDB();
    const testDoc = db.collection(collection).doc(documentId);
    await fbAssertSucceeds(testDoc.get());
  });
});
