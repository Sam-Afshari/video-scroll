import { Provider } from "react-redux";

import MoviesScreen from "./movies/screens/MoviesScreen";

import { store } from "./store";

import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <MoviesScreen />
    </Provider>
  );
};

export default App;
