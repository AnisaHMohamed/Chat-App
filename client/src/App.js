import react from 'react';
import {BrowserRouter as Router, Route}from 'react-router-dom';
import Join from './join';
import Chat from './chat';

const App = () => (
  <Router>
    <Route path="/" exact component={Join}/>
    <Route path="/chat" exact component={Chat}/>

  </Router>
)
export default App;

