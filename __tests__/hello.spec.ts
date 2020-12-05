// See: https://firebase.google.com/docs/rules/unit-tests?hl=ja
import {
  initializeDB,
  fbAssertFails,
  fbAssertSucceeds,
  deleteFirebaseApps,
} from './helpers/firebase-helper';

describe('Jest動作確認テスト', () => {
  afterEach(async () => {
    await deleteFirebaseApps();
    console.log('Done deleting fb apps!');
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
});
