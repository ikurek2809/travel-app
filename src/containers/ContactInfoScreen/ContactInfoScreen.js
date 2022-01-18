import React, {Component} from 'react';

import classes from "./ContactInfoScreen.module.css";
import {connect} from "react-redux";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import countriesApi from "../../api/countriesApi";
import FormHelperText from "@mui/material/FormHelperText";
import {saveContactInfoScreenData} from "../../store/actions/actions";


class ContactInfoScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      countries: [],
      cities: [],
      selectedCountry: {
        value: props.contactInfoScreenData.country,
        showError: false
      },
      selectedCity: {
        value: props.contactInfoScreenData.city,
        showError: false
      },
      email: {
        value: props.contactInfoScreenData.email,
        showError: false
      },
      repeatedEmail: {
        value: props.contactInfoScreenData.email,
        showError: false,
        errorMessage: ""
      },
      phoneNumber: {
        value: props.contactInfoScreenData.phoneNumber,
        showError: false
      },
      streetName: {
        value: props.contactInfoScreenData.streetName,
        showError: false
      },
      streetNumber: {
        value: props.contactInfoScreenData.streetNumber,
        showError: false
      },
    }
  }

  async componentDidMount() {
    const response = await countriesApi.get('/countries')
    const countries = response.data.data.map(c => c.country)
    let cities = [];
    if (this.state.selectedCountry.value) {
      cities = response.data.data.filter(c => c.country === this.state.selectedCountry.value)[0].cities
    }
    this.setState({data: response.data.data, countries: countries, cities: cities})
  }

  onCountryChange = (e) => {
    const selectedCountry = e.target.value
    console.log("data", this.state.data)
    const cities = this.state.data.filter(c => c.country === selectedCountry)[0].cities
    this.setState({selectedCountry: {value: selectedCountry, showError: false}, cities: cities})
  }

  onCityChange = (e) => {
    const selectedCity = e.target.value;
    this.setState({selectedCity: {value: selectedCity, showError: false}})
  }


  onInputChange = (e) => {
    this.setState({
      [e.target.name]: {
        value: e.target.value,
        showError: false
      }
    })
  };


  onNextClick = () => {
    let valid = true;
    if (!this.state.email.value) {
      this.setState({email: {showError: true}})
      valid = false;
    }
    if (!this.state.repeatedEmail.value) {
      this.setState({repeatedEmail: {showError: true, errorMessage: "FIELD IS REQUIRED!"}})
      valid = false;
    } else if (this.state.repeatedEmail.value !== this.state.email.value) {
      this.setState({repeatedEmail: {showError: true, errorMessage: "EMAILS DO NOT MATCH!"}})
      valid = false;
    }
    if (!this.state.phoneNumber.value) {
      this.setState({phoneNumber: {showError: true}})
      valid = false;
    }
    if (!this.state.streetName.value) {
      this.setState({streetName: {showError: true}})
      valid = false;
    }
    if (!this.state.streetNumber.value) {
      this.setState({streetNumber: {showError: true}})
      valid = false;
    }
    if (!this.state.selectedCountry.value) {
      this.setState({selectedCountry: {showError: true}})
      valid = false;
    }
    if (!this.state.selectedCity.value) {
      this.setState({selectedCity: {showError: true}})
      valid = false;
    }

    if (!valid) {
      return
    }
    this.props.saveContactInfoScreenData({
      email: this.state.email.value,
      phoneNumber: this.state.phoneNumber.value,
      streetName: this.state.streetName.value,
      streetNumber: this.state.streetNumber.value,
      country: this.state.selectedCountry.value,
      city: this.state.selectedCity.value,
    })
    this.props.history.push("/passengers")
  }

  onBackClick = () => {
    this.props.history.push("/basicInfo")
  };

  render() {
    return (
      <Grid className={classes['contact-info-screen']} container spacing={2}>
        <Grid className={classes['progress-bar']} item xs={8}>
          <LinearProgress variant="determinate" value={60}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography><h1>Contact info</h1></Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><h4>Enter your contact data</h4></Typography>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>Email:</InputLabel>
                  <TextField value={this.state.email.value}
                             error={this.state.email.showError}
                             onChange={this.onInputChange}
                             name="email"
                             variant="outlined"/>
                  {this.state.email.showError && <FormHelperText>Field required</FormHelperText>}
                </Grid>
                <Grid item xs={6}>
                      <InputLabel>Repeat Email:</InputLabel>
                      <TextField value={this.state.repeatedEmail.value}
                                 error={this.state.repeatedEmail.showError}
                                 onChange={this.onInputChange}
                                 name="repeatedEmail"
                                 variant="outlined"/>
                  {this.state.repeatedEmail.showError && <FormHelperText>Field required</FormHelperText>}
                </Grid>
                <Grid item xs={6}>
                      <InputLabel id="demo-simple-select-label">Phone number:</InputLabel>
                      <TextField value={this.state.phoneNumber.value}
                                 error={this.state.phoneNumber.showError}
                                 onChange={this.onInputChange}
                                 name="phoneNumber"
                                 variant="outlined"/>
                  {this.state.phoneNumber.showError && <FormHelperText>Field required</FormHelperText>}
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={6}>
                      <FormControl error={this.state.selectedCountry.showError} fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={this.state.selectedCountry.value}
                          onChange={this.onCountryChange}
                        >
                          {this.state.countries.map(c => (
                            <MenuItem value={c}>{c}</MenuItem>
                          ))}
                        </Select>
                        {this.state.selectedCountry.showError && <FormHelperText>Field Required</FormHelperText>}
                      </FormControl>
                </Grid>
                <Grid item xs={6}>
                      <FormControl error={this.state.selectedCity.showError} fullWidth>
                        <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={this.state.selectedCity.value}
                          onChange={this.onCityChange}
                        >
                          {this.state.cities.map(c => (
                            <MenuItem value={c}>{c}</MenuItem>
                          ))}
                        </Select>
                        {this.state.selectedCity.showError && <FormHelperText>Field Required</FormHelperText>}
                      </FormControl>
                </Grid>
                <Grid item xs={6}>
                      <InputLabel id="demo-simple-select-label">Street Name:</InputLabel>
                      <TextField value={this.state.streetName.value}
                                 error={this.state.streetName.showError}
                                 onChange={this.onInputChange}
                                 name="streetName"
                                 variant="outlined"/>
                  {this.state.streetName.showError && <FormHelperText>Field required</FormHelperText>}
                </Grid>
                <Grid item xs={6}>
                      <InputLabel id="demo-simple-select-label">Street Number:</InputLabel>
                      <TextField value={this.state.streetNumber.value}
                                 error={this.state.streetNumber.showError}
                                 onChange={this.onInputChange}
                                 name="streetNumber"
                                 variant="outlined"/>
                  {this.state.streetNumber.showError && <FormHelperText>Field required</FormHelperText>}
                </Grid>
                <Grid className={classes['button-area']} align="left" item xs={6}>
                  <Button onClick={this.onBackClick} variant="outlined">Back</Button>
                </Grid>
                <Grid className={classes['button-area']} align="right" item xs={6}>
                  <Button variant="outlined" onClick={this.onNextClick}>Next</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    contactInfoScreenData: state.contactInfoScreenData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    saveContactInfoScreenData: (contactInfoScreenData) => dispatch(saveContactInfoScreenData(contactInfoScreenData)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ContactInfoScreen);
