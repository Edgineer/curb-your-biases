import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Root from "./components/root";
import { rootReducer } from './reducers';

// creates a redux store that holds the complete state tree of the app
const store = createStore(rootReducer);

const App = () => (
  // the provider makes the redux store availbale to any nested components that have been wrapped in the connect() function
  <Provider store={store}>
    <Root />
  </Provider>
)

ReactDOM.render(<App />,document.getElementById("root"));
