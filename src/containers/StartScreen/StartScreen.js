import React, {Component} from 'react';

import classes from "./StartScreen.module.css";
import {connect} from "react-redux";
import countriesApi from "../../api/countriesApi";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {saveStartScreenData} from "../../store/actions/actions";
import FormHelperText from "@mui/material/FormHelperText";


class StartScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      countries: [],
      cities: [],
      selectedCountry: {
        value: props.startScreenData.country,
        showError: false
      },
      selectedCity: {
        value: props.startScreenData.city,
        showError: false
      },
    };
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
    const cities = this.state.data.filter(c => c.country === e.target.value)[0].cities;
    this.setState({
      selectedCountry: {
        value: e.target.value,
        showError: false
      },
      cities: cities
    })
  };

  onCityChange = (e) => {
    this.setState({
      selectedCity: {
        value: e.target.value,
        showError: false
      }
    })
  };

  onNextClick = () => {
    let valid = true;
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
    this.props.saveStartScreenData({
      country: this.state.selectedCountry.value,
      city: this.state.selectedCity.value,
    });
    this.props.history.push("/destination")
  };

  onBackClick = () => {
    this.props.history.push("/")
  };

  render() {
    return (
      <Grid className={classes['start-screen']} container spacing={2}>
        <Grid className={classes['progress-bar']} item xs={8}>
          <LinearProgress variant="determinate" value={15}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography><h1>From where do you travel</h1></Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><h4>Choose start of your journey</h4></Typography>
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
                    {this.state.selectedCountry.showError && <FormHelperText>Field required</FormHelperText>}
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
                    {this.state.selectedCity.showError && <FormHelperText>Field required</FormHelperText>}
                  </FormControl>
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
    startScreenData: state.startScreenData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    saveStartScreenData: (startScreenData) => dispatch(saveStartScreenData(startScreenData)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
