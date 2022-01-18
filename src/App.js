import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import IntroScreen from "./containers/IntroScreen/IntroScreen";
import Container from "@mui/material/Container";
import StartScreen from "./containers/StartScreen/StartScreen";
import DestinationScreen from "./containers/DestinationScreen/DestinationScreen";
import BasicInfoScreen from "./containers/BasicInfoScreen/BasicInfoScreen";
import ContactInfoScreen from "./containers/ContactInfoScreen/ContactInfoScreen";
import PassengersScreen from "./containers/PassengersScreen/PassengersScreen";
import SummaryScreen from "./containers/SummaryScreen/SummaryScreen";


function App() {
  return (
    <Router>
      <Container maxWidth="md">
            <Switch>
              <Route exact path="/" component={IntroScreen}/>
              <Route exact path="/start" component={StartScreen}/>
              <Route exact path="/destination" component={DestinationScreen}/>
              <Route exact path="/basicInfo" component={BasicInfoScreen}/>
              <Route exact path="/contactInfo" component={ContactInfoScreen}/>
              <Route exact path="/passengers" component={PassengersScreen}/>
              <Route exact path="/summary" component={SummaryScreen}/>
            </Switch>
      </Container>
    </Router>

  );
}

export default App;
