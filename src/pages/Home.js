import logo from "../assert/img/logo.svg";
import "../assert/styles/Home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { initializeSocket, getSocket } from '../utils/socketManager';
import { setSocketConnection, setSocketDisconnected } from "../redux/Reducer/socket";

const Home = () => {
  const [valuetext, setvaluetext] = useState("");
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.socket.isConnected);

  useEffect(() => {
    initializeSocket(
      (socket) => {
        dispatch(setSocketConnection());
      },
      (error) => {
        console.log("error", error);
      },
      (attempt) => {
        console.log("attempt", attempt);
      },
      (res) => {
        console.log("replay", res);
      }
    );

    return () => {
      const socket = getSocket();
      if (socket) {
        socket.disconnect();
        dispatch(setSocketDisconnected());
      }
    };
  }, [dispatch]);

  const handleChange = (event) => {
    setvaluetext(event.target.value);
  };

  const handleSubmit = () => {
    const socket = getSocket();
    if (socket) {
      socket.emit("new_chat", valuetext);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label>
          Chat message:
          <input type="text" value={valuetext} onChange={handleChange} />
        </label>
        <button onClick={handleSubmit} disabled={!isConnected}>Send</button>
      </header>
    </div>
  );
};

export default Home;
