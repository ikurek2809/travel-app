import React, {Component} from 'react';

import Grid from '@mui/material/Grid';


import classes from "./IntroScreen.module.css";
import {connect} from "react-redux";
import destinationTypes from "../../constants/destinationTypes";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {saveIntroScreenData} from "../../store/actions/actions";


class IntroScreen extends Component {

  state = {
    destinationType: this.props.destinationType
  };

  onCardClick = (destination) => {
    if (this.state.destinationType === destination) {
      this.setState({destinationType: ""})
    } else {
      this.setState({destinationType: destination})
    }
  };

  onNextClick = () => {
    this.props.saveIntroScreenData({
      destinationType: this.state.destinationType
    });
    this.props.history.push("/start")
  };


  render() {
    return (
      <Grid className={classes['intro-screen']} container spacing={2}>
        <Grid className={classes['progress-bar']} item xs={8}>
          <LinearProgress variant="determinate" value={0}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography><h1>Where do you travel</h1></Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><h4>Choose where do you travel</h4></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Card className={this.state.destinationType === destinationTypes.CROATIA ? classes.blue : ""}
                        raised={this.state.destinationType === destinationTypes.CROATIA}
                        onClick={() => this.onCardClick(destinationTypes.CROATIA)}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        CROATIA
                      </Typography>
                      <Typography sx={{mb: 1.5}} color="text.secondary">
                        Select if your destination is Croatia
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card className={this.state.destinationType === destinationTypes.WORLD ? classes.blue : ""}
                        raised={this.state.destinationType === destinationTypes.WORLD}
                        onClick={() => this.onCardClick(destinationTypes.WORLD)}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        EUROPE
                      </Typography>
                      <Typography sx={{mb: 1.5}} color="text.secondary">
                        Select if your destination is in Europe
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid className={classes['button-area']} align="right" item xs={12}>
                  <Button disabled={!this.state.destinationType} variant="outlined" onClick={this.onNextClick}>Next</Button>
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
    destinationType: state.introScreenData.destinationType
  }
};

const mapDispatchToProps = dispatch => {
  return {
    saveIntroScreenData: (introScreenData) => dispatch(saveIntroScreenData(introScreenData)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);
