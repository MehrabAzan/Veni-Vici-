import { useState } from 'react'
import './App.css'

const DOG_SEARCH_URL =
  'https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=true&size=med&mime_types=jpg,png'

async function fetchDogWithBreed() {
  const searchResponse = await fetch(DOG_SEARCH_URL)

  if (!searchResponse.ok) {
    throw new Error('Failed to fetch from The Dog API')
  }

  const [imageSummary] = await searchResponse.json()

  if (!imageSummary?.id) {
    return null
  }

  const detailResponse = await fetch(
    `https://api.thedogapi.com/v1/images/${imageSummary.id}`,
  )

  if (!detailResponse.ok) {
    return null
  }

  const image = await detailResponse.json()

  if (!image?.breeds?.length) {
    return null
  }

  let breed = image.breeds[0]

  const breedResponse = await fetch(
    `https://api.thedogapi.com/v1/breeds/${breed.id}`,
  )

  if (breedResponse.ok) {
    const fullBreed = await breedResponse.json()
    breed = { ...breed, ...fullBreed }
  }

  return { image, breed }
}

const DOG_NAMES = [
  'Buddy', 'Duke', 'Daisy', 'Rocky', 'Bailey', 'Cooper', 'Molly', 'Bear',
  'Sadie', 'Tucker', 'Maggie', 'Bentley', 'Zoey', 'Murphy', 'Stella', 'Winston',
  'Lola', 'Oliver', 'Riley', 'Bella', 'Finn', 'Rosie', 'Scout', 'Harley',
]

const DOG_EMOJIS = ['🐕', '🐶', '🦮', '🐕‍🦺', '🐩', '🦴', '🎾', '🐾']

function getWeightValue(breed) {
  if (breed.weight?.imperial) {
    return `${breed.weight.imperial} lbs`
  }

  return 'Unknown'
}

function getDisplayAttributes(breed) {
  return [
    { key: 'breed', label: 'Breed', value: breed.name },
    { key: 'weight', label: 'Weight', value: getWeightValue(breed) },
    { key: 'origin', label: 'Origin', value: breed.origin },
    { key: 'lifespan', label: 'Lifespan', value: `${breed.life_span} years` },
  ]
}

function getAttributeValues(breed) {
  return getDisplayAttributes(breed).map((attr) => attr.value)
}

function isBanned(breed, banList) {
  return getAttributeValues(breed).some((value) => banList.includes(value))
}

function randomDogName() {
  return DOG_NAMES[Math.floor(Math.random() * DOG_NAMES.length)]
}

function App() {
  const [currentDog, setCurrentDog] = useState(null)
  const [banList, setBanList] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const toggleBan = (value) => {
    setBanList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  const discover = async () => {
    setLoading(true)
    setError(null)

    try {
      let found = null
      const maxAttempts = 60

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        const result = await fetchDogWithBreed()

        if (!result) {
          continue
        }

        const { image, breed } = result

        if (isBanned(breed, banList)) {
          continue
        }

        const name = randomDogName()
        const attributes = getDisplayAttributes(breed)

        found = {
          id: image.id,
          name,
          imageUrl: image.url,
          breed,
          attributes,
        }
        break
      }

      if (!found) {
        setError(
          banList.length > 0
            ? 'No dogs match your ban list. Try removing some bans!'
            : 'Could not find a dog right now. Please try again.',
        )
        setLoading(false)
        return
      }

      setCurrentDog(found)
      setHistory((prev) => [
        {
          id: found.id,
          name: found.name,
          imageUrl: found.imageUrl,
          summary: `A ${found.breed.name} dog from ${found.breed.origin}`,
        },
        ...prev,
      ])
    } catch {
      setError('Something went wrong fetching dogs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <aside className="sidebar history-sidebar">
        <h2>Who have we seen so far?</h2>
        <div className="history-list">
          {history.length === 0 ? (
            <p className="sidebar-hint">Discover a dog to start your history!</p>
          ) : (
            history.map((entry) => (
              <div key={`${entry.id}-${entry.name}`} className="history-item">
                <img src={entry.imageUrl} alt={entry.summary} />
                <span>{entry.summary}</span>
              </div>
            ))
          )}
        </div>
      </aside>

      <main className="main-panel">
        <div className="main-card">
          <header className="app-header">
            <h1>Veni Vici!</h1>
            <p className="tagline">
              Discover dogs from your wildest dreams!
            </p>
            <div className="emoji-row" aria-hidden="true">
              {DOG_EMOJIS.map((emoji) => (
                <span key={emoji}>{emoji}</span>
              ))}
            </div>
          </header>

          {currentDog && (
            <section className="animal-display">
              <h2 className="animal-name">{currentDog.name}</h2>
              <div className="attribute-row">
                {currentDog.attributes.map((attr) => (
                  <button
                    key={attr.key}
                    type="button"
                    className={`attribute-btn${banList.includes(attr.value) ? ' banned' : ''}`}
                    onClick={() => toggleBan(attr.value)}
                    aria-pressed={banList.includes(attr.value)}
                  >
                    {attr.value}
                  </button>
                ))}
              </div>
              <img
                className="animal-image"
                src={currentDog.imageUrl}
                alt={`${currentDog.name}, a ${currentDog.breed.name} dog`}
              />
            </section>
          )}

          {error && <p className="error-message">{error}</p>}

          <button
            type="button"
            className="discover-btn"
            onClick={discover}
            disabled={loading}
          >
            {loading ? 'Discovering...' : '🔀 Discover!'}
          </button>
        </div>
      </main>

      <aside className="sidebar ban-sidebar">
        <h2>Ban List</h2>
        <p className="sidebar-hint">Select an attribute in your listing to ban it.</p>
        <div className="ban-list">
          {banList.length === 0 ? (
            <p className="ban-empty">No banned attributes yet.</p>
          ) : (
            banList.map((value) => (
              <button
                key={value}
                type="button"
                className="ban-item"
                onClick={() => toggleBan(value)}
              >
                {value}
              </button>
            ))
          )}
        </div>
      </aside>
    </div>
  )
}

export default App
