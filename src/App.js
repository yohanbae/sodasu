import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Main from "./Component/Main";
import Create from "./Component/Create";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />        
        <Route exact path="/main/:id?" component={Main} />
        <Route exact path="/create" component={Create} />
      </Switch>
      <ToastContainer transition={Slide} position={toast.POSITION.BOTTOM_LEFT} />

    </Router>
  );
}

export default App;
