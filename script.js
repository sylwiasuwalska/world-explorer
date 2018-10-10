"use strict";

class App extends React.Component {
	state = {
		value: "Warszawa"
	}

	inputToState(event) {
		event.preventDefault();
		this.setState({value: event.target[0].value});
	}

	render() {
		return 	<div>
					<form onSubmit={this.inputToState.bind(this)}>
						<input type="text" placeholder={this.state.value} />
						<button>Search</button>
					</form>
					<Weather location={this.state.value} />
					<Map location={this.state.value} />
				</div>
	}
}


class Weather extends React.Component {
	state = {
		temp: null,
		icon: null,
		desc: null
	}

	requestWeather(location) {
		var url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=04f7272d3cbc10bd25a84e890e8916a5`
		fetch(url)
			.then(function(resp) {
	            return resp.json();
	        })
	        .then(this.updateWeather.bind(this))
	
	}

	updateWeather(data) {
		this.setState({
			temp: data.main.temp,
			icon: data.weather[0].icon,
			desc: data.weather[0].description
		})
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !=  prevProps.location) {
			this.requestWeather(this.props.location);
		}
	}

	componentDidMount() {
		if (this.props.location) {
			this.requestWeather(this.props.location);
		}
	}

	render() {

		return 	<div>
					<div className="temp">{this.state.temp}</div>
					<img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} />
					<div className="desc">{this.state.desc}</div>
				</div>
	}
}

class Map extends React.Component {
	map = null;


	requestMap(location) {
		var self = this;
		
		var geocoder = new google.maps.Geocoder();

		geocoder.geocode({'address': location}, function(results, status) {
			if (status === 'OK') {
			  self.map.setCenter(results[0].geometry.location);
			} else {
			  alert('Geocode was not successful for the following reason: ' + status);
			}
	  });
	}
	
	componentDidMount() {
		this.map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 0, lng: 0},
			zoom: 8
		});
		if (this.props.location) {
			this.requestMap(this.props.location);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !=  prevProps.location) {
			this.requestMap(this.props.location);
		}
	}

	render () {
		return <div id="map"></div>
	}
}


ReactDOM.render(<App />, document.getElementById('app'));


