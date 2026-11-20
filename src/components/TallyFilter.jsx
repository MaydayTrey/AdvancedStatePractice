import { useFilter, useTallyActions } from "../store";

const TallyFilter = () => {
    const { setFilter } = useTallyActions()
    const filter = useFilter()
    return (
        <div>
            <input data-testid="filter" value={filter} onChange={({ target }) => setFilter(target.value)}/>
        </div>
    )
}

/*
All thsi does is pull out setFilter for the onChange, then the filter is the state of the filter.
Return a div; where the testid is filter; the value is referring to the state; on change takes the target, 
sets the filter. 

*/

export default TallyFilter