import React, { Component } from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Layout from '../components/Layout/Layout';
import CreateProperty from './Property/CreateProperty/CreateProperty';
import NotFound from '../components/ErrorPages/NotFound/NotFound';
import UpdateProperty from './Property/UpdateProperty/UpdateProperty';  
import InternalServer from '../components/ErrorPages/InternalServer/InternalServer'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/updateProperty/:id" component={UpdateProperty} />
            <Route path="/createProperty" component={CreateProperty} />
            <Route path="/500" component={InternalServer} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
