import { FormEventHandler, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const nameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setName(event.target.value);
  };
  const nameSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (name.length > 0) {
      localStorage.setItem("name", name);
      navigate("/race");
    }
  };
  return (
    <div className="w-screen h-screen text-white bg-black p-10 overflow-hidden flex items-center justify-center">
      <div className="flex">
        <h1 className="text-7xl font-bold flex-1">
          Multitype, test your typing speed
        </h1>
        <div className="flex flex-col flex-1 items-center justify-center">
          <form
            onSubmit={nameSubmitHandler}
            className="flex flex-col flex-1 items-center justify-center gap-3"
          >
            <input
              type="text"
              name="name"
              className="min-w-72 h-10 p-1 text-black"
              placeholder="Name"
              onChange={nameChangeHandler}
            />
            <button className="min-w-72 h-10 bg-gray-100 text-black focus:border-gray-700 focus:border hover:bg-gray-200 rounded-sm active:bg-gray-300">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
