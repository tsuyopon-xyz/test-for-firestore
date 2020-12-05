import * as firebase from '@firebase/rules-unit-testing';
import fs from 'fs';
import { resolve } from 'path';

const TEST_PROJECT_ID = 'test-for-firestore-id-for-test-suite';

// "process.cwd()" outputs project root path
// because of "npm test" is run at the project root.
firebase.loadFirestoreRules({
  projectId: TEST_PROJECT_ID,
  rules: fs.readFileSync(resolve(process.cwd(), 'firestore.rules'), 'utf8'),
});

type Auth = {
  uid: string;
  email: string;
};

const initializeDB = (auth?: Auth) => {
  const app = firebase.initializeTestApp({
    projectId: TEST_PROJECT_ID,
    auth,
  });

  return app.firestore();
};

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
  initializeDB,
  deleteFirebaseApps,
  clearFirestoreData,
  fbAssertFails,
  fbAssertSucceeds,
};
