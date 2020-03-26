"use strict";

class App extends React.Component {
	state = {
		value: "California"
	};

	inputToState(event) {
		event.preventDefault();
		this.setState({ value: event.target[0].value });
	}

	render() {
		return (
			<div>
				<form
					className="form form-group"
					onSubmit={this.inputToState.bind(this)}
				>
					<h2>Find city:</h2>
					<input
						type="text"
						className="form-control form-control-md"
						placeholder={this.state.value}
					/>
					<button className="btn btn-secondary btn-md">Search</button>
				</form>
				<Weather location={this.state.value} />
				<Photos location={this.state.value} />
			</div>
		);
	}
}

class Weather extends React.Component {
	state = {
		temp: null,
		icon: null,
		desc: null
	};

	requestWeather(location) {
		var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=04f7272d3cbc10bd25a84e890e8916a5`;
		fetch(url)
			.then(function(resp) {
				return resp.json();
			})
			.then(this.updateWeather.bind(this));
	}

	updateWeather(data) {
		if (!data.main) {
			this.setState({
				temp: "no data ",
				icon: "",
				desc: "no data"
			});
		} else {
			this.setState({
				temp: data.main.temp,
				icon: data.weather[0].icon,
				desc: data.weather[0].description
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.location != prevProps.location) {
			this.requestWeather(this.props.location);
		}
	}

	componentDidMount() {
		if (this.props.location) {
			this.requestWeather(this.props.location);
		}
	}

	render() {
		var img;
		if (this.state.icon == undefined) {
			img = "";
		} else {
			img = (
				<img
					src={`http://openweathermap.org/img/w/${this.state.icon}.png`}
				/>
			);
		}

		return (
			<div className="weather">
				{img}
				<h3>
					{" "}
					Current weather in {this.props.location}: {this.state.temp}
					°C, {this.state.desc}{" "}
				</h3>
			</div>
		);
	}
}

class Photos extends React.Component {
	state = {
		photos: []
	};

	requestPhotos(location) {
		var url = `https://pixabay.com/api/?key=10415994-d2b5573302ae22b5f38dc60a2&q=${location}&image_type=photo&per_page=10`;
		fetch(url)
			.then(function(resp) {
				return resp.json();
			})
			.then(this.updatePhotos.bind(this));
	}

	updatePhotos(data) {
		this.setState({
			photos: data.hits.map(item => item.webformatURL)
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.location != prevProps.location) {
			this.requestPhotos(this.props.location);
		}
	}

	componentDidMount() {
		if (this.props.location) {
			this.requestPhotos(this.props.location);
		}
	}

	render() {
		return (
			<div className="photo-container">
				<h3>Photos tagged in {this.props.location}:</h3>
				<div className="photos">
					{this.state.photos.map((item, i) => (
						<img key={i} src={item} />
					))}
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
