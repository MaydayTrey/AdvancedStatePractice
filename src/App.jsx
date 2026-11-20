import { useEffect } from "react";
import { useTallyActions} from "./store";
import TallyList from "./components/TallyList";
import TallyFilter from "./components/TallyFilter";
import TallyForm from "./components/TallyForm";

const App = () => {
  const { initialize } = useTallyActions()

 useEffect(() => {
  initialize()
}, [initialize])

  return (
    <div>
    <TallyFilter />
    <TallyList />
    <TallyForm />
    </div>

  )

}

export default App