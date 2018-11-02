import React, { Component } from "react";
import "./App.css";
import { slide as Menu } from "react-burger-menu";
import { load_google_maps, load_places } from "./Utils";
import MapContainer from "./components/MapContainer";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ""
		};
	}

	componentDidMount() {
		let googleMapsPromise = load_google_maps();
		let placesPromise = load_places();

		Promise.all([googleMapsPromise, placesPromise]).then(values => {
			// console.log(values);
			let google = values[0];
			this.places = values[1];

			this.google = google;
			this.markers = [];
			this.infowindow = new google.maps.InfoWindow();

			this.map = new google.maps.Map(document.getElementById("map"), {
				// Center map on DFW Metroplex.
				center: {
					lat: 32.833888,
					lng: -96.969632
				},
				zoom: 10
			});

			// For each place, create a marker on the map with place info.
			this.places.forEach(place => {
				let marker = new google.maps.Marker({
					position: { lat: place.position.lat, lng: place.position.lng },
					map: this.map,
					id: place.id,
					name: place.name,
					address: place.address,
					website: place.website,
					animation: google.maps.Animation.DROP
				});

				// Push the marker to the array of markers.
				this.markers.push(marker);

				// Content of InfoWindow.
				let infoWindowContent = `
          <div className="infowindow-content">
            <h3>${place.name}</h3>
            <p><address>${place.address}</address></p>
            <p>Website: <a href="${place.website}" target="_blank">${place.website}</a></p>
            <p>Source: Myjson API</p>
          </div>`;

				// Open InfoWindow and populate with content, and animate marker, when marker is clicked.
				marker.addListener("click", () => {
					if (marker.getAnimation() !== null) {
						marker.setAnimation(null);
					} else {
						marker.setAnimation(google.maps.Animation.BOUNCE);
					}
					setTimeout(() => {
						marker.setAnimation(null);
					}, 2000);
				});
				google.maps.event.addListener(marker, "click", () => {
					this.infowindow.setContent(infoWindowContent);
					this.infowindow.open(this.map, marker);
				});
			});

			this.setState({ filteredPlaces: this.places });
		});
	}

	clickListItem = place => {
		let marker = this.markers.filter(m => m.id === place.id)[0];
		// console.log(marker);

		// Content of InfoWindow.
		let infoWindowContent = `
    <div className="infowindow-content">
      <h3>${place.name}</h3>
      <p><address>${place.address}</address></p>
      <p>Website: <a href="${place.website}" target="_blank">${place.website}</a></p>
      <p>Source: Myjson API</p>
    </div>`;

		// Animate marker when list item is clicked.
		marker.setAnimation(this.google.maps.Animation.BOUNCE);
		setTimeout(() => {
			marker.setAnimation(null);
		}, 2000);

		// Open InfoWindow when list item is clicked.
		this.infowindow.setContent(infoWindowContent);
		this.infowindow.open(this.map, marker);
	};

	// Loop thru the markers and filter for places that match the query string.
	filterPlaces(query) {
    // console.log(query);

		// Filter place list per query.
		let f = this.places.filter(place =>
			place.name.toLowerCase().includes(query.toLowerCase())
		);
		this.markers.forEach(marker => {
      // console.log(marker);

			// Toggle marker visibility per query match.
			marker.name.toLowerCase().includes(query.toLowerCase())
				? marker.setVisible(true)
				: marker.setVisible(false);
		});

		// Filtered places is the result of f filter, update query input.
		this.setState({ filteredPlaces: f, query });
	}

	render() {
		return (
			<div className="App">
				<Menu isOpen>
					<input
						type="search"
						placeholder="Filter by Name"
						value={this.state.query}
						onChange={event => {
							this.filterPlaces(event.target.value);
						}}
						className="places-filter"
					/>

					<ul className="places-list">
						{this.state.filteredPlaces &&
							this.state.filteredPlaces.length > 0 &&
							this.state.filteredPlaces.map((place, index) => (
								<li className="place-list-item" key={place.id}>
									<button
										className="place-list-item-button"
										key={place.id}
										onClick={() => {
											this.clickListItem(place);
										}}
									>
										{place.name}
									</button>
								</li>
							))}
					</ul>
				</Menu>
				<MapContainer />
			</div>
		);
	}
}

export default App;
