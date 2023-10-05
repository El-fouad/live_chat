import { useRef, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "./firebase";
import { getDocs, doc, onSnapshot } from "firebase/firestore";
function App() {
  const [Message, setMessage] = useState("");
  const [res, setRes] = useState([]);
  const ref = collection(firestore, "contacts");
  const submithandler = (e) => {
    e.preventDefault();
    // Firebase creates this automatically
    let data = {
      user: "R",
      message: Message,
    };
    try {
      addDoc(ref, data);
      console.log("added");
    } catch (err) {
      console.log(err);
    }
    setMessage("");
  };

  // get messages
  const getMessages = async () =>
    onSnapshot(ref, (doc) => {
      const urls = [];
      doc.forEach((doc) => {
        urls.push(doc.data());
      });
      setRes(urls);
    });

  useEffect(() => {
    getMessages();
  }, []);
  return (
    <div className="App">
      <div className=" flex justify-center items-start w-screen mt-10 h-screen">
        <div className=" flex-[0.2] flex w-full justify-center">
          <div className=" h-8 w-8 rounded-full bg-orange ">R</div>
        </div>
        <div className="flex flex-col w-80 h-96 ">
          <div className=" flex-[0.8]  bg-purple px-1 py-2 overflow-auto rounded-lg">
            {/* pers 1 */}
            {res[0]
              ? res.map((m) => (
                  <div
                    className={` flex ${
                      m.user === "R" ? "flex-row" : " flex-row-reverse"
                    }  justify-end w-full  p-2`}
                  >
                    <div
                      className={` w-[80%] h-full ${
                        m.user === "R" ? "bg-gray" : "bg-green"
                      } p-2  rounded-md`}
                    >
                      <p>{m.message} </p>
                    </div>
                    <div className=" mx-1 h-5 w-5 bg-orange rounded-full flex justify-center items-center">
                      {m.user}
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <form
            onSubmit={submithandler}
            className=" flex-[0.2] px-2 flex items-center bg-blue rounded-lg"
          >
            <div className=" flex-[0.8] h-[60%] ">
              <input
                type="text"
                placeholder="Message..."
                onChange={(e) => setMessage(e.target.value)}
                value={Message}
                className=" h-full w-full rounded-lg px-2"
              />
            </div>
            <div className=" flex-[0.2]">
              <button type="submit" className=" bg-green rounded-lg px-2 py-3">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <form onSubmit={submithandler}>
        <input
          type="text"
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Save</button>
      </form> */}
    </div>
  );
}

export default App;
