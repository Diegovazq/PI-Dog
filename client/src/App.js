import "./App.css";
import { Route, BrowserRouter,Switch} from "react-router-dom";
import Landing from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import NavBar from "./components/navBar/NavBar";
import Error from "./components/error/Error";

function App() {
  return (
    <BrowserRouter>
    <>
 
    <Route path="/" component={NavBar}/>
    
      <Switch>
      
      <Route path="/home" component={Home}/>
     
      <Route path="/detail/:id" component={Detail}/>
      <Route path="/createDog" component={Form}/>
      
       <Route path="/" component={Landing}/>
      <Route path="*" component={Error}/>
     </Switch>
    </>
    </BrowserRouter>
  );
}

export default App;