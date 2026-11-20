import { useTallies, useTallyActions } from "../store";

const TallyList = () => {
    const tallies = useTallies()
    const {increment, remove} = useTallyActions()
    return (
        <div>
            {tallies.map(tally => (
                <div key={tally.id}>
                    <div>{tally.label}</div>
                    <div>The tally for this is: {tally.count}</div>
                    <button onClick={() => increment(tally.id)}>Increase Count</button>
                    <button onClick={() => remove(tally.id)}>Remove the tally</button>
                </div>
            ))}
        </div>
    )
}

export default TallyList