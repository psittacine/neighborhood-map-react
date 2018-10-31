import React, { Component } from "react";
import "./App.css";
import { slide as Menu } from "react-burger-menu";
import { load_google_maps, load_places } from "./Utils";
import MapContainer from "./components/MapContainer";

class App extends Component {
	componentDidMount() {
		let googleMapsPromise = load_google_maps();
		let placesPromise = load_places();

		Promise.all([googleMapsPromise, placesPromise]).then(values => {
			// console.log(values);
			let google = values[0];
			let places = values[1];

			this.google = google;
			this.markers = [];

			this.map = new google.maps.Map(document.getElementById("map"), {
				// Center map on DFW Metroplex
				center: {
					lat: 32.833888,
					lng: -96.969632
				},
				zoom: 10
			});

			// for each place, create a marker on the map with place info
			places.forEach(place => {
				let marker = new google.maps.Marker({
					position: { lat: place.position.lat, lng: place.position.lng },
					map: this.map,
					id: place.id,
					name: place.name,
					address: place.address,
					website: place.website,
					animation: google.maps.Animation.DROP
				});
			});
		});
	}

	render() {
		return (
			<div className="App">
				<Menu>
					<p>Sample Item 1</p>
					<p>Sample Item 2</p>
					<p>Sample Item 3</p>
				</Menu>
				<MapContainer />
			</div>
		);
	}
}

export default App;
