import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import ProfileTab from "./components/ProfileTab";

function App() {
   return (
      <div className="App">
         {/* <Navbar /> */}
         <ProfileTab />
         <Main />
      </div>
   );
}

export default App;
