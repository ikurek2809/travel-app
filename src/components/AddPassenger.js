import React, {Component} from 'react'

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import TextField from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Radio from "@mui/material/Radio/Radio";
import Button from "@mui/material/Button";


class AddPassenger extends Component {

  state = {
    firstName: {
      value: "",
      showError: false
    },
    lastName: {
      value: "",
      showError: false
    },
    luggage: {
      value: true,
      showError: false
    },
    valid: false
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: {
        value: e.target.value,
        showError: false
      }
    })
  };

  onSaveClick = () => {
    let valid = true;
    if (!this.state.firstName.value) {
      this.setState({firstName: {showError: true}})
      valid = false;
    }
    if (!this.state.lastName.value) {
      this.setState({lastName: {showError: true}})
      valid = false;
    }
    if (!this.state.luggage.value) {
      this.setState({luggage: {showError: true}})
      valid = false;
    }
    if (!valid) {
      return;
    }

    this.props.addPassenger({
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      luggage: this.state.luggage.value
    })
    this.props.hidePassengerForm()
  }

  onCancelClick = () => {
    this.props.hidePassengerForm()
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <InputLabel>First Name:</InputLabel>
              <TextField name="firstName"
                         error={this.state.firstName.showError}
                         value={this.state.firstName.value}
                         onChange={this.onInputChange}
                         label="First Name"
                         variant="outlined"/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <InputLabel>Last Name:</InputLabel>
              <TextField name="lastName"
                         error={this.state.lastName.showError}
                         value={this.state.lastName.value}
                         onChange={this.onInputChange}
                         label="Last Name"
                         variant="outlined"/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <FormControl component="fieldset">
                <FormLabel component="legend">Luggage</FormLabel>
                <RadioGroup name="luggage"
                            error={this.state.luggage.showError}
                            value={this.state.luggage.value}
                            onChange={this.onInputChange}
                            row aria-label="gender">
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={this.onSaveClick} variant="outlined">SAVE</Button>
          <Button onClick={this.onCancelClick} variant="outlined">CANCEL</Button>
        </Grid>
      </Grid>
    );
  }
}

export default AddPassenger;

