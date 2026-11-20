//Zustand state management

import { create } from 'zustand'
import tallyService from './services/tallyService'

const useTallyStore = create((set, get) => ({
    tallies: [],
    filter: '',
    actions: {
         initialize: async () => {
            const tallies = await tallyService.getAll()
            set(() => ({ tallies }))
         },
        add: async (label) => {
            //This needs to add, so use tallyService;
            //createNewLabel expects a label passed.
            //After using the service; we update the state of tallies, concatenating
            const newTally = await tallyService.createNewLabel(label)
            set(state => ({ tallies: state.tallies.concat(newTally)}))
        },
        increment: async (id) => {
            //This needs to increment the count of a tally
            //We need to run update, with the id and tally
            //Then we need to replace that tally within our state
            const tallyToUpdate = get().tallies.find(n => n.id === id)
            const tallyUpdated =  {...tallyToUpdate, count: tallyToUpdate.count + 1}
            const updatedTally = await tallyService.update(id, tallyUpdated)
            set(state => ({ tallies: state.tallies.map(n => n.id === id ? updatedTally : n)}))
            
        },
        remove: async (id) => {
            const toBeRemoved = get().tallies.find(n => n.id === id) //In case we need some op on it
            await tallyService.remove(id)
            set(state => ({ tallies: state.tallies.filer(n => n.id !== id)}))
        },
        setFilter: value => set(() => ({ filter: value })),
    }
}))

export const useTallies = () => {
    const filter = useTallyStore(state => state.filter)
    const tallies = useTallyStore(state => state.tallies)

    const filtered = tallies.filter(n => n.label.includes(filter))
    return filtered.toSorted((a, b) => b.count - a.count)
}

export const useFilter = () => useTallyStore(state => state.filter)
export const useTallyActions = () => useTallyStore(state => state.actions)
