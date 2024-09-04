import { CustomScroll } from "react-custom-scroll";
import "./App.css";
import AppBar from "./components/appBar/appBar";

function App() {
  return (
    <CustomScroll>
      <AppBar />
    </CustomScroll>
  );
}

export default App;
