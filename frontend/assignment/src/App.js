import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/" component={Home} exact />
        </Switch>
    </Router>
  );
}

export default App;
