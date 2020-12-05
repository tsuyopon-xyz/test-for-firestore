// See: https://firebase.google.com/docs/rules/unit-tests?hl=ja
import {
  db,
  fbAssertFails,
  fbAssertSucceeds,
  deleteFirebaseApps,
} from './helpers/firebase-helper';

describe('Jest動作確認テスト', () => {
  // beforeAll(async () => {
  //   await deleteFirebaseApps();
  // });

  afterAll(async () => {
    await deleteFirebaseApps();
    console.log('Done deleting fb apps!');
  });

  it('Can read items in the readonly collection', async () => {
    const testDoc = db.collection('readonly').doc('testDoc');
    await fbAssertSucceeds(testDoc.get());
  });

  it('Cannot write items in the readonly collection', async () => {
    const testDoc = db.collection('readonly').doc('testDoc2');
    await fbAssertFails(testDoc.set({ hoge: 'fuga' }));
  });
});
