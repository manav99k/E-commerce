import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const vibecheck = true;
const config = {
	apiKey            : 'AIzaSyBHLgjysv-oMOgI7lF6QTjl91FYtbvLosc',
	authDomain        : 'crown-db-df949.firebaseapp.com',
	databaseURL       : 'https://crown-db-df949.firebaseio.com',
	projectId         : 'crown-db-df949',
	storageBucket     : 'crown-db-df949.appspot.com',
	messagingSenderId : '699510358331',
	appId             : '1:699510358331:web:bd7fd3b97e0d5f0d6ff71e',
	measurementId     : 'G-9J2X2S4V4Q'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (err) {
			console.log('error while creating user, ', err.message);
		}
	}
	return userRef;
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);
	const batch = firestore.batch();

	objectsToAdd.forEach((obj) => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollections = collections.docs.map((doc) => {
		const { title, items } = doc.data();
		return {
			routeName : encodeURI(title.toLowerCase()),
			id        : doc.id,
			title,
			items
		};
	});
	return transformedCollections.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
