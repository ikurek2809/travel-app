import React, {Component} from 'react';

import classes from "./BasicInfoScreen.module.css";
import {connect} from "react-redux";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {saveBasicInfoScreenData} from "../../store/actions/actions";
import FormHelperText from "@mui/material/FormHelperText";


class BasicInfoScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: {
        value: props.basicInfoScreenData.firstName,
        showError: false
      },
      lastName: {
        value: props.basicInfoScreenData.lastName,
        showError: false
      },
      identificationNumber: {
        value: props.basicInfoScreenData.identificationNumber,
        showError: false,
        errorMessage: ""
      },
      dateOfBirth: {
        value: props.basicInfoScreenData.dateOfBirth,
        showError: false,
        errorMessage: ""
      },
      gender: {
        value: props.basicInfoScreenData.gender,
        showError: false
      },
    }
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: {
        value: e.target.value,
        showError: false
      }
    })
  };

  onDateChange = (value) => {
    this.setState({
      dateOfBirth: {
        value: value,
        showError: false,
        errorMessage: ""
      }
    })
  };

  isOibValid = (input) => {
    const oib = input.toString();

    if (oib.match(/\d{11}/) === null) {
      return false;
    }

    let calculated = 10;

    for (const digit of oib.substring(0, 10)) {
      calculated += parseInt(digit);

      calculated %= 10;

      if (calculated === 0) {
        calculated = 10;
      }

      calculated *= 2;

      calculated %= 11;
    }

    let check = 11 - calculated;

    if (check === 10) {
      check = 0;
    }

    return check === parseInt(oib[10]);
  };


  onNextClick = () => {
    let valid = true;
    if (!this.state.firstName.value) {
      this.setState({firstName: {showError: true}})
      valid = false;
    }
    if (!this.state.lastName.value) {
      this.setState({lastName: {showError: true}})
      valid = false;
    }
    if (!this.state.identificationNumber.value) {
      this.setState({identificationNumber: {showError: true, errorMessage: "FIELD IS REQUIRED!"}})
      valid = false;
    } else if (!this.isOibValid(this.state.identificationNumber.value)) {
      this.setState({identificationNumber: {showError: true, errorMessage: "OIB IS INVALID"}})
      valid = false;
    }
    if (!this.state.gender.value) {
      this.setState({gender: {showError: true}})
      valid = false;
    }
    console.log(this.state.dateOfBirth.value)


    if (!this.state.dateOfBirth.value) {
      this.setState({dateOfBirth: {showError: true, errorMessage: "Field Required"}})
      valid = false;
    }
    if (!valid) {
      return
    }
    this.props.saveBasicInfoScreenData({
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      identificationNumber: this.state.identificationNumber.value,
      dateOfBirth: this.state.dateOfBirth.value,
      gender: this.state.gender.value
    });
    this.props.history.push("/contactInfo")
  };

  onBackClick = () => {
    this.props.history.push("/destination")
  };

  render() {
    return (
      <Grid className={classes['basic-info-screen']} container spacing={2}>
        <Grid className={classes['progress-bar']} item xs={8}>
          <LinearProgress variant="determinate" value={45}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography><h1>Basic info</h1></Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><h4>Enter your data</h4></Typography>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>First Name:</InputLabel>
                  <TextField value={this.state.firstName.value}
                             error={this.state.firstName.showError}
                             onChange={this.onInputChange}
                             name="firstName"
                             variant="outlined"/>
                  {this.state.firstName.showError && <FormHelperText>Field required</FormHelperText>}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>Last Name:</InputLabel>
                  <TextField value={this.state.lastName.value}
                             error={this.state.lastName.showError}
                             onChange={this.onInputChange}
                             name="lastName"
                             variant="outlined"/>
                  {this.state.lastName.showError && <FormHelperText>Field required</FormHelperText>}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-label">Identification number:</InputLabel>
                  <TextField value={this.state.identificationNumber.value}
                             error={this.state.identificationNumber.showError}
                             onChange={this.onInputChange}
                             name="identificationNumber"
                             variant="outlined"/>
                  {this.state.identificationNumber.showError && <FormHelperText>Field required</FormHelperText>}
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date desktop"
                      inputFormat="dd.MM.yyyy."
                      value={this.state.dateOfBirth.value}
                      error={this.state.dateOfBirth.showError}
                      onChange={this.onDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>{this.state.dateOfBirth.showError && <p>{this.state.dateOfBirth.errorMessage}</p>}
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup value={this.state.gender.value}
                                error={this.state.gender.showError}
                                onChange={this.onInputChange}
                                row aria-label="gender"
                                name="gender">
                      <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                      <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                    </RadioGroup>
                  </FormControl>
                  {this.state.gender.showError && <FormHelperText>Field required</FormHelperText>}
                </Grid>
                <Grid item xs={6}>

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
    basicInfoScreenData: state.basicInfoScreenData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    saveBasicInfoScreenData: (basicInfoScreenData) => dispatch(saveBasicInfoScreenData(basicInfoScreenData)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(BasicInfoScreen);
