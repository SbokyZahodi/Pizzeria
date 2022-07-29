import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "./App.css";
import NewMain from "./components/Body/NewMain";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { store } from "./Redux/store";

function AppContainer() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <NewMain />
      <Footer />
      <Toaster />
    </div>
  );
}

export default AppContainer;
