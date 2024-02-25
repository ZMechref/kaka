import React from 'react';
import { connect } from 'react-redux';

class ParlorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.autocomplete = "";
  }

  initialState() {
    return {
      name: '',
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
      googleMapLink: ''
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Dispatch your action with the updated state
    this.props.dispatch(this.state);
  }

  handlePlaceSelect() {
    // Accessing the details from the Autocomplete instance
    const place = this.autocomplete.getPlace();
    if (!place.geometry) {
      console.error('Place details not found');
      return;
    }

    const addressComponents = place.address_components;
    let city = '';
    let state = '';

    // Loop through address components to find city and state
    addressComponents.forEach(component => {
      if (component.types.includes('locality')) {
        city = component.long_name;
      } else if (component.types.includes('administrative_area_level_1')) {
        state = component.short_name;
      }
    });

    // Update the state with retrieved city and state
    this.setState({
      city,
      state,
      zip_code: place.address_components.find(comp => comp.types.includes('postal_code'))?.short_name || '',
      googleMapLink: place.url
    });
  }

  componentDidMount() {
    this.checkGoogleMaps();
  }
  
  checkGoogleMaps = () => {
    if (window.google && window.google.maps) {
      // Initialize the Autocomplete or perform necessary actions here
    } else {
      // Check again after a delay
      setTimeout(this.checkGoogleMaps, 100); // Check again after 100ms
    }
  }
  
  handlePlaceSelect() {
    // Get the selected place from the Autocomplete object
    const place = this.autocomplete.getPlace();
  
    // Extract and process the address components
    let zipCode = '';
    place.address_components.forEach((component) => {
      if (component.types.includes('postal_code')) {
        zipCode = component.long_name;
      }
    });
  
    // Do something with the extracted zip code (e.g., save it in state or perform further actions)
    console.log('Selected zip code:', zipCode);
    // You can set the zip code in state or use it as needed in your application
  }
  
  handleSubmit(event) {
    event.preventDefault();
    if (this.props.dispatch) {
      this.props.dispatch(this.setState(this.state)); // Issue is here
    } else {
      console.error('Dispatch function not available in props');
    }
  }
  
  render() {
    return (
      <div>
        <h1>Add New Location</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            id="autocomplete"
            className="input-field"
            ref="input"
            type="text"
            placeholder="City or Zip/Postal Code"
            autoComplete="off"
            onChange={this.handleChange}
          />
          {/* Other input fields for name, street_address, etc. */}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect()(ParlorForm);
