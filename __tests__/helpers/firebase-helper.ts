import * as firebase from '@firebase/rules-unit-testing';
import fs from 'fs';
import { resolve } from 'path';

// "process.cwd()" outputs project root path
// because of "npm test" is run at the project root.
firebase.loadFirestoreRules({
  projectId: process.env.FIREBASE_PROJECT_ID as string,
  rules: fs.readFileSync(resolve(process.cwd(), 'firestore.rules'), 'utf8'),
});

type Auth = {
  uid: string;
  email: string;
};

const initializeDB = (auth?: Auth) => {
  const app = firebase.initializeTestApp({
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    auth,
  });

  return app.firestore();
};

const deleteFirebaseApps = async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
};

const clearFirestoreData = async () => {
  await firebase.clearFirestoreData({
    projectId: process.env.FIREBASE_PROJECT_ID as string,
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
