import React, { Component } from "react";

class PlaceList extends Component {
	render() {
		return (
			<React.Fragment>
				<input
					type="search"
					placeholder="Filter by Name"
					value={this.props.query}
					onChange={event => {
						this.props.filterPlaces(event.target.value);
					}}
					className="places-filter"
					aria-label="Filter by Name"
				/>
				<ul className="places-list">
					{this.props.filteredPlaces &&
						this.props.filteredPlaces.length > 0 &&
						this.props.filteredPlaces.map((place, index) => (
							<li className="place-list-item" key={place.id}>
								<button
									className="place-list-item-button"
									key={place.id}
									onClick={() => {
										this.props.clickListItem(place);
									}}
								>
									{place.name}
								</button>
							</li>
						))}
				</ul>
			</React.Fragment>
		);
	}
}

export default PlaceList;
