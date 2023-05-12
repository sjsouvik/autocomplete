import { Autocomplete } from "./components";
import { useFetch } from "./hooks/useFetch";
import { loadUsers } from "./helper/utils";
import "./App.css";

const App = () => {
  const { data } = useFetch(loadUsers);

  return <Autocomplete users={data} />;
};

export default App;
