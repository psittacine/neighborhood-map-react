// Helper functions adapted from:  https://github.com/ryanwaite28/script-store/blob/master/js/react_resolve_google_maps.js

// This Google Maps implementation method is given in the Udacity classroom project instructions, listed under Additional Resources:  Using Google Maps in a React component (StackOverflow) -- https://stackoverflow.com/questions/48493960/using-google-map-in-react-component

// Load Google Maps directly
export function load_google_maps() {
	return new Promise(function(resolve, reject) {
		// define the global callback that will run when google maps is loaded
		window.resolveGoogleMapsPromise = function() {
			// resolve the google object
			resolve(window.google);
			// delete the global callback to tidy up since it is no longer needed
			delete window.resolveGoogleMapsPromise;
		};
		// Now, Load the Google Maps API
		const script = document.createElement("script");
		const API_KEY = "AIzaSyAKr-pN0CfPRzuW3HTLOKvjftgCcj76iHg";
		script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
		script.async = true;
		document.body.appendChild(script);
	});
}

// Load Places data from 3rd party API
export function load_places() {
	return fetch("https://api.myjson.com/bins/xvv5m")
		.then(response => response.json())
		.catch(error => alert("Error loading places data from Myjson API"));
}
