import * as firebase from '@firebase/rules-unit-testing';
import fs from 'fs';
import { resolve } from 'path';

const TEST_PROJECT_ID = 'test-for-firestore-id-for-test-suite';
// const TEST_PROJECT_ID = process.env.FIREBASE_PROJECT_ID as string;

const app = firebase.initializeTestApp({
  projectId: TEST_PROJECT_ID,
  auth: { uid: 'test_user', email: 'test@example.com' },
});

// "process.cwd()" outputs project root path
// because of "npm test" is run at the project root.
firebase.loadFirestoreRules({
  projectId: TEST_PROJECT_ID,
  rules: fs.readFileSync(resolve(process.cwd(), 'firestore.rules'), 'utf8'),
});

const db = app.firestore();
// const auth = app.auth();

const deleteFirebaseApps = async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
};

const clearFirestoreData = async () => {
  await firebase.clearFirestoreData({
    projectId: TEST_PROJECT_ID,
  });
};

const fbAssertFails = async (pr: Promise<any>) => {
  return await firebase.assertFails(pr);
};

const fbAssertSucceeds = async (pr: Promise<any>) => {
  return await firebase.assertSucceeds(pr);
};

export {
  db,
  // auth,
  deleteFirebaseApps,
  clearFirestoreData,
  fbAssertFails,
  fbAssertSucceeds,
};
