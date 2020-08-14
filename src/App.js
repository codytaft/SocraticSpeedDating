import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import appSyncConfig from "./aws-exports";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import Amplify from 'aws-amplify';
import './Styles/App.scss';
import './Styles/reset.scss';
import { Home } from './Components/Home'
import Header from './Components/Header'


Amplify.configure(appSyncConfig);

const App = () => (
  <Router>
    <div>
      <div className="App">
        <Header />
        <Route exact={true} path="/" component={Home} />
      </div>
    </div>
  </Router>
);

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
  },
  cacheOptions: {
    dataIdFromObject: (obj) => {
      let id = defaultDataIdFromObject(obj);

      return id;
    }
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
