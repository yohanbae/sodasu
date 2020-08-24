import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Main from "./Component/Main";
import Main2 from "./Component/Main2";
import Create from "./Component/Create";
import Multy from "./Component/Multy";

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactGA from 'react-ga';
import Person2 from './Component/Person2';
import Search from './Component/Search';
ReactGA.initialize('UA-148153392-1');
ReactGA.pageview(window.location.pathname + window.location.search);



function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main2} />        
        <Route exact path="/main/:id?" component={Main2} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/multy" component={Multy} />
        <Route exact path="/person" component={Person2} />
        <Route exact path="/search" component={Search} />
        
      </Switch>
      <ToastContainer transition={Slide} position={toast.POSITION.BOTTOM_LEFT} />

    </Router>
  );
}

export default App;
