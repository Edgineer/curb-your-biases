import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

ReactDOM.render(<App />,document.getElementById("root"));
