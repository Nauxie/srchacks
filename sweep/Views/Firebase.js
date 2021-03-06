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

		// reload event
		this.mapReloadEvent = null;

		this.storage = firebase.storage();
		this.img = firebase.storage().ref();

		// this.getReload = this.getReload.bind(this);
		this.getMarkers = this.getMarkers.bind(this);
		this.pickup = this.pickup.bind(this);
	}

	addReloadEventListener(task) {
		this.mapReloadEvent = task;
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
				this.users.doc(this.user).set({
					name: user.displayName,
					image: user.photoURL,
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
			history.push(id);

			let score = doc.data().score;
			this.markers.doc(id).get().then((mark) => {
				score += mark.data().points;
				this.users.doc(this.user).update({
					score,
					history,
				});
			});
		});
	}

	async postMarker(data) {
		const ref = v1();
		fetch(`data:image/png;base64,${data.image.base64}`)
			.then(res => res.blob())
			.then(async (blob) => {
				this.img.child(`${ref}.png`).put(blob).then((snap) => {
					snap.ref.getDownloadURL().then((url) => {
						console.log(`Uploaded ${ref}.png to ${url}`);
					});
				});
				navigator.geolocation.getCurrentPosition((loc) => {
					this.db.collection('markers').doc(ref).set({
						latitude: loc.coords.latitude + 0.0001,
						longitude: loc.coords.longitude + 0.0001,
						poster: this.user,
						picked: false,
						title: data.title,
						points: Math.round(data.points),
					});
				});
			});
		if (this.mapReloadEvent) this.mapReloadEvent();
	}

	async getImage(id) {
		const url = await this.storage.ref(`${id}.png`).getDownloadURL();
		return (url);
	}
}
export default Firebase;
