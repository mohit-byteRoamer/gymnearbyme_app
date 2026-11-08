import { GYMS } from '../../data/gyms'

describe('Bookmark Feature Logic', () => {
  const initialIds: string[] = []

  const isBookmarked = (ids: string[], gymId: string) => ids.includes(gymId)

  const addBookmark = (ids: string[], gymId: string) =>
    ids.includes(gymId) ? ids : [...ids, gymId]

  const removeBookmark = (ids: string[], gymId: string) =>
    ids.filter((id) => id !== gymId)

  const toggleBookmark = (ids: string[], gymId: string) =>
    isBookmarked(ids, gymId) ? removeBookmark(ids, gymId) : addBookmark(ids, gymId)

  const getBookmarkedGyms = (ids: string[]) =>
    GYMS.filter((g) => ids.includes(g.id))

  test('correctly detects if gym is bookmarked or not', () => {
    expect(isBookmarked(initialIds, 'iron-forge-fitness')).toBe(false)
    const updated = addBookmark(initialIds, 'iron-forge-fitness')
    expect(isBookmarked(updated, 'iron-forge-fitness')).toBe(true)
  })

  test('toggles bookmark on and off', () => {
    let ids: string[] = []
    ids = toggleBookmark(ids, 'iron-forge-fitness')
    expect(ids).toEqual(['iron-forge-fitness'])

    ids = toggleBookmark(ids, 'cult-fit-sarabha')
    expect(ids).toEqual(['iron-forge-fitness', 'cult-fit-sarabha'])

    ids = toggleBookmark(ids, 'iron-forge-fitness')
    expect(ids).toEqual(['cult-fit-sarabha'])
  })

  test('resolves full GymItem details for bookmarked IDs', () => {
    const ids = ['iron-forge-fitness', 'cult-fit-sarabha']
    const gyms = getBookmarkedGyms(ids)
    expect(gyms.length).toBe(2)
    expect(gyms[0].id).toBe('iron-forge-fitness')
    expect(gyms[1].id).toBe('cult-fit-sarabha')
    expect(gyms[0].name).toBeTruthy()
    expect(gyms[0].locality).toBeTruthy()
    expect(gyms[0].coverPhoto).toBeTruthy()
  })

  test('handles empty bookmark list gracefully', () => {
    const gyms = getBookmarkedGyms([])
    expect(gyms).toEqual([])
  })

  test('handles non-existent gym IDs gracefully', () => {
    const gyms = getBookmarkedGyms(['non-existent-gym-id'])
    expect(gyms).toEqual([])
  })
})
