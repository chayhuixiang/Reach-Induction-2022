import { useState, useEffect } from "react";
import Reach from "./assets/Reach.png";
import Github from  "./assets/Github.svg";
import Spinner from "./Components/Spinner";
import ConfettiGenerator from "confetti-js";
import endpoint from "./constants/endpoint";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);
    setSuccess(false);

    try {
      const response = await fetch(endpoint + "/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ PAT: import.meta.env.VITE_PAT, username: e.target[0].value })
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      if (data.status === 404) {
        throw new Error(data.response.data.message);
      }
      console.log(data);
      setShowConfetti(true);
      setSuccess(true);
      
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let confetti;
    if (showConfetti) {
      const confettiSettings = { target: 'canvas' };
      confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
    }
   
    return () => {
      if (confetti) {
        confetti.clear()
      }
    };
  }, [showConfetti])

  return (
    <div className="bg-gray-800 flex flex-col justify-center items-center h-screen">
      <canvas id="canvas" className="absolute h-screen" />
      <img src={Reach} alt="Reach" width="100" className="animate-bounce"/>
      { error && <p className="text-sm text-red-400">{error}</p>}
      { success && <p className="text-sm text-green-400">Congrats on being inducted into Project Enable!</p>}
      <form className="mt-2" onSubmit={onSubmit}>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <img src={Github} alt="Github" />
          </div>
          <input type="text" className="border text-sm rounded-lg block w-48 pl-11 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" placeholder="chayhuixiang"></input>
        </div>
        <button type="submit" className="mt-3 h-[40px] text-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-48 bg-yellow-400 hover:bg-yellow-200 transition-colors duration-500 relative">
          { isLoading ? <Spinner className="w-4 m-auto" /> : "Submit Github Handle"}
        </button>
      </form>
    </div>
  )
}

export default App
