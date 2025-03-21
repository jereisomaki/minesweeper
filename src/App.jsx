import Game from "./Game";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="w-full min-h-full flex items-center justify-center bg-neutral-900">
      <div className="flex flex-col gap-2">
        <Header />
        <Game />
      </div>
    </div>
  );
};

export default App;
