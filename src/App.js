import React, { useEffect, useState } from 'react';
import Paqqets from './sendPaqqets';
 
import { getToken } from './Utils/Common';
import Login from './login';
import './App.css';
import { useCookies } from "react-cookie";
 
function App() { 
const [login, setLogin] = useState(false);
const [cookies, setCookie, removeCookie] = useCookies(["RefreshToken"]);
let token = "";
token = cookies["RefreshToken"];
useEffect( ()=> {
  if (token === undefined) {
    setLogin(false);
    localStorage.clear();
   } else {
    setLogin(true)
   }
})
  if(login === true) {
    return <Paqqets  removeCookie={removeCookie}/>
  } else {
    return (<div  className="App">
   <Login setCookie={setCookie} cookies={cookies} />
    </div>)
  }
}
export default App;