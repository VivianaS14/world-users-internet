import { Navbar, TopCountries, UsersXCountry, UsersXYear } from "./components";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <UsersXYear />
      <UsersXCountry />
      <TopCountries />
    </div>
  );
};

export default App;
