import { useEffect } from "react";
import { useTallyActions} from "./store";
import TallyList from "./components/TallyList";
import TallyFilter from "./components/TallyFilter";
import TallyForm from "./components/TallyForm";
import Toast from "./components/Toast";

const App = () => {
  const { initialize } = useTallyActions()

 useEffect(() => {
  initialize()
}, [initialize])

  return (
    <div>
    <Toast />
    <TallyFilter />
    <TallyList />
    <TallyForm />
    </div>

  )

}

export default App