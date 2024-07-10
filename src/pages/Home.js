import logo from "../assert/img/logo.svg";
import "../assert/styles/Home.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import app_env from "../utils/index"

const Home = () => {
  let [valuetext, setvaluetext] = useState("");
  let [socket,Setsocket] = useState()

  useEffect(()=>{
    let socket  = io(app_env.socket_domain);

    socket.io.on("error", (error) => {
      console.log("error", error);
    });
  
    socket.io.on("ping", () => {
      console.log("ping");
    });
  
    socket.io.on("reconnect", (attempt) => {
      console.log("attempt", attempt);
    });
  
    socket.io.on("reconnect_attempt", (attempt) => {
      console.log("attempt", attempt);
    });
  
    socket.io.on("reconnect_error", (error) => {
      console.log("error", error);
    });
  
    socket.io.on("reconnect_failed", () => {
      console.log("reconnect_failed");
    });
  
    socket.on("connect", () => {
      Setsocket(socket)
      console.log("connected socket client");
    });
  
    socket.on("replay", (res) => {
      console.log("replay", res);
    });
  },[])

  function handleChange(event) {
    setvaluetext(event.target.value);
  }

  function handleSubmit() {
    socket.emit("new_chat", valuetext);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label>
          Chat message:
          <input type="text" value={valuetext} onChange={handleChange} />
        </label>
        <button onClick={handleSubmit}>Send</button>
      </header>
    </div>
  );
};

export default Home;
