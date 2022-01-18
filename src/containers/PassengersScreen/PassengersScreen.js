import React, {Component} from 'react';

import classes from "./PassengersScreen.module.css";
import {connect} from "react-redux";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddPassenger from "../../components/AddPassenger";
import {savePassengersInfoScreenData} from "../../store/actions/actions";


class PassengersScreen extends Component {

  constructor(props) {
    super(props);

    let initialPassengers = [];

    if (props.passengersInfoScreenData.passengers) {
      initialPassengers = [...props.passengersInfoScreenData.passengers]
    } else {
      initialPassengers = [
        {
          firstName: props.basicInfoScreenData.firstName,
          lastName: props.basicInfoScreenData.lastName,
          luggage: "yes",
        }
      ]
    }

    this.state = {
      passengers: initialPassengers,
      showAddPassengerForm: false
    }
  }

  onNextClick = () => {
    this.props.savePassengersInfoScreenData({
      passengers: this.state.passengers
    });
    this.props.history.push("/summary")
  };

  onBackClick = () => {
    this.props.history.push("/contactInfo")
  };

  onAddPassengerClick = () => {
    this.setState({showAddPassengerForm: true})
  };

  onRemovePassengerClick = (index) => {
    const newPassengers = [...this.state.passengers];
    newPassengers.splice(index,1);
    this.setState({passengers: newPassengers})
  };

  hidePassengerForm = () => {
    this.setState({showAddPassengerForm: false})
  };

  addPassenger = (passenger) => {
    const newPassengers = [...this.state.passengers];
    newPassengers.push(passenger);
    this.setState({passengers: newPassengers})
  };



  render() {
    return (
      <Grid className={classes['passenger-screen']} container spacing={2}>
        <Grid className={classes['progress-bar']} item xs={8}>
          <LinearProgress variant="determinate" value={75}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography><h1>Passengers</h1></Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><h4>Enter your passenger data</h4></Typography>
                </Grid>
                {this.state.passengers.map((p, index) => (
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography>{index + 1}. {p.firstName} {p.lastName}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography>Luggage : {p.luggage}</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            {index > 0 && <Button onClick={() => this.onRemovePassengerClick(index)}>REMOVE</Button>}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid item xs={6}>
                  <Button onClick={this.onAddPassengerClick} variant="outlined">ADD</Button>
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={12}>
                  {this.state.showAddPassengerForm && <AddPassenger addPassenger={this.addPassenger} hidePassengerForm={this.hidePassengerForm} />}
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
    basicInfoScreenData: state.basicInfoScreenData,
    passengersInfoScreenData: state.passengersInfoScreenData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    savePassengersInfoScreenData: (passengersInfoScreenData) => dispatch(savePassengersInfoScreenData(passengersInfoScreenData)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(PassengersScreen);
