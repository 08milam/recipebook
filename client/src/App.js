// App.js

import ListHeader from "./components/ListHeader";
import ListItem from "./components/Listitem";
import Auth from "./components/Auth";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Navbar from "./components/Navbar";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTask] = useState(null);

  // const authToken = false

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:5001/todo/${userEmail}`);
      const json = await response.json();

      setTask(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  });

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <div>
            <Navbar />
          </div>
          <div className="content-container">
            <div className="contents">
              <div className="menu-heading">
                {" "}
                <ListHeader listName={"DIET MATE"} getData={getData} />
                <hr className="line"></hr>
              </div>

              {sortedTasks?.map((task) => (
                <ListItem key={task.id} task={task} getData={getData} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
