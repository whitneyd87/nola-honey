import "./app.css";
import { HashRouter as Router } from "react-router-dom";
import MainNavView from "./components/mainNavView.js";
import MainView from "./components/mainView.js";

function App(props) {
  return (
    <Router basename={"/"}>
      <div className="App">
        <MainNavView />
        <MainView />
        <footer>
          <p>Copyright DuBourgDesign, LLC</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
