import Login from "./components/Login";
import Sign_Up from "./components/Sign_Up";
import User_Home_Page from "./components/User_Home_Page";
import New_Entry from "./components/New_Entry";
import Index from "./components/Index";
import Show from "./components/Show";
import Update from "./components/Update";

function App() {
  return (
    <div>
      <Login /> 
      <Sign_Up />
      <User_Home_Page />
      <New_Entry />
      <Index />  
      <Show />
      <Update />
    </div>
  );
};

export default App;
