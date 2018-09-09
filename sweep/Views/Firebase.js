import firebase from 'firebase';
import '@firebase/firestore';
import v1 from 'uuid';

class Firebase {
	constructor() {
		firebase.initializeApp({
			apiKey: 'AIzaSyCEx-jQXJCYwAI5ZrHBe1VpVKksR9fFCk8',
			authDomain: 'sweep-215818.firebaseapp.com',
			databaseURL: 'https://sweep-215818.firebaseio.com',
			projectId: 'sweep-215818',
			storageBucket: 'sweep-215818.appspot.com',
			messagingSenderId: '23813249783',
		});

		this.db = firebase.firestore();
		const settings = { timestampsInSnapshots: true };
		this.db.settings(settings);

		this.markers = this.db.collection('markers');
		this.users = this.db.collection('users');
		this.user = 'YpezIiNLJC9KH2c9D63i'; // USER AUTHENTICATION

		this.storage = firebase.storage();
		this.img = firebase.storage().ref();

		this.getMarkers = this.getMarkers.bind(this);
		this.pickup = this.pickup.bind(this);
	}

	setUserId(user) {
		this.user = user.uid;
		let exists = false;
		this.users.get().then((snap) => {
			snap.forEach((doc) => {
				if (doc.id === user.uid) {
					exists = true;
				}
			});
			if (!exists) {
				this.users.doc(user.id).set({
					name: user.displayName,
					image: user.photoUrl,
					history: [],
					score: 0,
				});
			}
		});
	}

	async getUser() {
		await this.users.doc(this.user).get().then((doc) => { this.userData = doc.data(); });
		return (this.userData);
	}

	async getMarkers(bool) {
		const markers = {};
		return this.markers.get().then((snapshot) => {
			snapshot.forEach((doc) => {
				if (bool) {
					if (!doc.data().picked) {
						markers[doc.id] = doc.data();
					}
				} else {
					markers[doc.id] = doc.data();
				}
			});
			return markers;
		});
	}

	pickup(id) {
		console.log(id);
		this.markers.doc(id).update({
			picked: true,
		});
		const history = [];
		this.users.doc(this.user).get().then((doc) => {
			for (const i of doc.data().history) {
				history.push(i);
			}
			console.log(history);
			history.push(id);
			console.log(history);

			let score = doc.data().score;
			console.log(score);
			this.markers.doc(id).get().then((doc) => {
				score += doc.data().points;
				this.users.doc(this.user).update({
					score,
					history,
				});
			});
		});
	}

	postMarker(data) {
		const title = data.title;
		const points = data.points;
		const ref = v1();
		this.img.child(`${ref}.png`);
		const image = new Blob(data.image, { type: 'data/png' });
		this.img.put(image).then((snap) => {
			console.log(snap);
		});

		this.db.collection('markers').doc(ref).set({
			latitude: 37.78425,
			longitude: -122.4364,
			poster: this.user,
			picked: false,
			title,
			points,
			img: ref,
		});
	}

	async getImage(id) {
		const url = await this.storage.ref(`${id}.png`).getDownloadURL();
		return (url);
	}
}
export default Firebase;
