import { useTallyActions } from "../store"

const TallyForm = () => {
  const { add }= useTallyActions()

  const addTally = (e) => {    
    e.preventDefault()    
    const label = e.target.tally.value    
    add(label)    
    e.target.reset()  
  }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addTally}>
                <div>
                    <input data-testid="new" name="tally" />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default TallyForm