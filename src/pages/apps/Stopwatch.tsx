import AdminSidebar from "../../components/AdminSidebar";
import { useState, useEffect } from "react";

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hoursInString = hours.toString().padStart(2, "0");
  const minutesInString = minutes.toString().padStart(2, "0");
  const secondsInString = seconds.toString().padStart(2, "0");

  return `${hoursInString}:${minutesInString}:${secondsInString}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isInputMode, setIsInputMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let intervalID: number;
    if (isRunning)
      intervalID = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning]);

  const handleTimeClick = () => {
    setIsInputMode(true);
    setInputValue(formatTime(time));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsInputMode(false);
    const [hours, minutes, seconds] = inputValue.split(":").map(Number);
    const newTime = hours * 3600 + minutes * 60 + seconds;
    setTime(newTime);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Stopwatch</h1>
        <section>
          <div className="stopwatch">
            <h2 onClick={handleTimeClick}>
              {isInputMode ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  autoFocus
                />
              ) : (
                formatTime(time)
              )}
            </h2>
            <button onClick={() => setIsRunning((prev) => !prev)}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={resetHandler}>Reset</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stopwatch;
