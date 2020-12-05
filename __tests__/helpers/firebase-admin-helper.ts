import * as firebase from '@firebase/rules-unit-testing';

type WriteDocumentInfo = {
  collection: string;
  documentId: string;
  data: {
    [key: string]: any;
  };
};

// For preparing test data
const writeSingleDocument = async ({
  collection,
  documentId,
  data,
}: WriteDocumentInfo) => {
  const db = firebase
    .initializeAdminApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    })
    .firestore();

  await db.collection(collection).doc(documentId).set(data);
};

export { writeSingleDocument };
