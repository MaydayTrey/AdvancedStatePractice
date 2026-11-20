import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/tallyService', () => ({
  default: {
    getAll: vi.fn(),
    createNewLabel: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

import tallyService from './services/tallyService'
import useTallyStore, { useTallies, useTallyActions } from './store'
import useToastStore from './toastStore'

const sample = [
  { id: '1', label: 'Pushups', count: 12 },
  { id: '2', label: 'Glasses of water', count: 4 },
  { id: '3', label: 'Pages read', count: 0 },
]

beforeEach(() => {
  useTallyStore.setState({ tallies: [], filter: '' })
  vi.clearAllMocks()
})

describe('the store, used directly', () => {
  it('starts with no tallies', () => {
    expect(useTallyStore.getState().tallies).toEqual([])
  })

  it('setFilter writes the filter', () => {
    useTallyStore.getState().actions.setFilter('push')
    expect(useTallyStore.getState().filter).toBe('push')
  })
})

describe('async actions against a mocked service', () => {
  it('initialize loads tallies from the service', async () => {
    tallyService.getAll.mockResolvedValue(sample)

    await act(async () => {
      await useTallyStore.getState().actions.initialize()
    })

    expect(useTallyStore.getState().tallies).toEqual(sample)
    expect(tallyService.getAll).toHaveBeenCalledTimes(1)
  })

  it('add appends whatever the server returned', async () => {
    const created = { id: '9', label: 'Squats', count: 0 }
    tallyService.createNewLabel.mockResolvedValue(created)

    await act(async () => {
      await useTallyStore.getState().actions.add('Squats')
    })

    expect(tallyService.createNewLabel).toHaveBeenCalledWith('Squats')
    expect(useTallyStore.getState().tallies).toContainEqual(created)
  })

  it('increment sends count + 1 and stores the reply', async () => {
    useTallyStore.setState({ tallies: sample })
    tallyService.update.mockImplementation(async (id, tally) => tally)

    await act(async () => {
      await useTallyStore.getState().actions.increment('2')
    })

    expect(tallyService.update).toHaveBeenCalledWith('2', {
      id: '2', label: 'Glasses of water', count: 5,
    })
    expect(useTallyStore.getState().tallies.find(t => t.id === '2').count).toBe(5)
  })

  it('remove drops the tally from state', async () => {
    useTallyStore.setState({ tallies: sample })
    tallyService.remove.mockResolvedValue(undefined)

    await act(async () => {
      await useTallyStore.getState().actions.remove('1')
    })

    expect(useTallyStore.getState().tallies.map(t => t.id)).toEqual(['2', '3'])
  })
})

describe('useTallies, through the hook', () => {
  it('returns tallies sorted by count, descending', () => {
    useTallyStore.setState({ tallies: sample })

    const { result } = renderHook(() => useTallies())

    expect(result.current.map(t => t.count)).toEqual([12, 4, 0])
  })

  it('returns only tallies whose label matches the filter', () => {
    useTallyStore.setState({ tallies: sample, filter: 'a' })

    const { result } = renderHook(() => useTallies())

    expect(result.current.map(t => t.label)).toEqual([
      'Glasses of water',
      'Pages read',
    ])
  })
})

describe('the toast store', () => {
  it('clears its message after five seconds', () => {
    vi.useFakeTimers()

    useToastStore.getState().actions.show('hello')
    expect(useToastStore.getState().message).toBe('hello')

    vi.advanceTimersByTime(5000)
    expect(useToastStore.getState().message).toBe(null)

    vi.useRealTimers()
  })
})