import React, {Component} from 'react';

import classes from "./SummaryScreen.module.css";
import {connect} from "react-redux";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";


class SummaryScreen extends Component {

  onEditClick = (screenName) => {
    this.props.history.push(screenName)
  };

  onBackClick = () => {
    this.props.history.push("/passengers")
  };


  render() {
    return (
      <Grid className={classes['summary-screen']} container spacing={2}>
        <Grid className={classes['progress-bar']} item xs={8}>
          <LinearProgress variant="determinate" value={100}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography><h1>Summary</h1></Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><h4>Check your data</h4></Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Typography><h5>From: {this.props.startScreenData.city}, {this.props.startScreenData.country}</h5></Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Button onClick={() => this.onEditClick("/start")}>EDIT</Button>
                    </Grid>
                  </Grid>
                  <hr/>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Typography><h5>To: {this.props.destinationScreenData.city}, {this.props.destinationScreenData.country}</h5></Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Button onClick={() => this.onEditClick("/destination")}>EDIT</Button>
                    </Grid>
                  </Grid>
                  <hr/>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Typography><h5>First Name: {this.props.basicInfoScreenData.firstName}</h5></Typography>
                      <Typography><h5>Last Name: {this.props.basicInfoScreenData.lastName}</h5></Typography>
                      <Typography><h5>OIB: {this.props.basicInfoScreenData.identificationNumber}</h5></Typography>
                      <Typography><h5>Gender: {this.props.basicInfoScreenData.gender}</h5></Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Button  onClick={() => this.onEditClick("/basicInfo")}>EDIT</Button>
                    </Grid>
                  </Grid>
                  <hr/>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Typography><h5>Email: {this.props.contactInfoScreenData.email}</h5></Typography>
                      <Typography><h5>Phone Number: {this.props.contactInfoScreenData.phoneNumber}</h5></Typography>
                      <Typography><h5>Address: {this.props.contactInfoScreenData.country}, {this.props.contactInfoScreenData.city}, {this.props.contactInfoScreenData.streetName}, {this.props.contactInfoScreenData.streetNumber} </h5></Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Button  onClick={() => this.onEditClick("/contactInfo")}>EDIT</Button>
                    </Grid>
                  </Grid>
                  <hr/>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {this.props.passengersInfoScreenData.passengers.map((p, index) => (
                      <Grid item xs={10}>
                        <Card>
                          <CardContent>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography>{index + 1}. {p.firstName} {p.lastName}</Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Typography>Luggage : {p.luggage}</Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                    <Grid item xs={2}>
                      <Button  onClick={() => this.onEditClick("/passengers")}>EDIT</Button>
                    </Grid>
                  </Grid>
                  <hr/>
                </Grid>
                <Grid className={classes['button-area']} align="left" item xs={6}>
                  <Button onClick={this.onBackClick} variant="outlined">Back</Button>
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
    startScreenData: state.startScreenData,
    destinationScreenData: state.destinationScreenData,
    basicInfoScreenData: state.basicInfoScreenData,
    contactInfoScreenData: state.contactInfoScreenData,
    passengersInfoScreenData: state.passengersInfoScreenData,

  }
};

const mapDispatchToProps = dispatch => {
  return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen);
