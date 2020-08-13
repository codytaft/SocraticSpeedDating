import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import appSyncConfig from "./aws-exports";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import Amplify, { DataStore }from 'aws-amplify';
import './Styles/App.scss';
import './Styles/reset.scss';
import { Home } from './Components/Home'


Amplify.configure(appSyncConfig);
DataStore.configure(awsconfig);

const App = () => (
  <Router>
    <div className="App">
      <Route exact={true} path="/" component={Home} />
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
