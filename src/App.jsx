import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import axios from "axios";
import { io } from "socket.io-client";

function App() {
  const [count, setCount] = useState(0);
  const [socket, setSocket] = useState(
    io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
    })
  );
  useEffect(() => {
    const fetchCookie = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_SERVER_URL, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(res.data);
        socket.emit("send:cookie", {});
        console.log("emitted");
      } catch (error) {
        console.log(error);
      }
    };
    fetchCookie();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
