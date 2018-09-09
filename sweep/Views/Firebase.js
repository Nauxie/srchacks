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
		
		this.img = firebase.storage().ref();

		this.getMarkers = this.getMarkers.bind(this);
		this.pickup = this.pickup.bind(this);
	}

	async getMarkers() {
		const markers = {};
		return this.markers.get().then((snapshot) => {
			snapshot.forEach((doc) => {
				if (!doc.data().picked) {
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
			console.log(doc.data());
			for (const i in doc.data().history) {
				history.push(i);
			}
			history.push(id);
			console.log(history);
			this.users.doc(this.user).update({
				history,
			});
		});
	}

	postMarker(data) {
		let title = data.title;
		let points = data.points;
		let ref = v1();
		this.img.child(ref);
		this.img.put(data.image).then((snap) => {
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
}

export default Firebase;
