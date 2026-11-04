import { ArtistResource } from "@/types/artist"

const API_KEY = process.env.EXPO_PUBLIC_LASTFM_API_KEY
const BASE_URL = "https://ws.audioscrobbler.com/2.0/"

export function getMusicData() {
  if (!API_KEY) {
    throw new Error(
      "Falta EXPO_PUBLIC_LASTFM_API_KEY. Añádela a tu archivo .env y reinicia el servidor de Expo."
    )
  }

  const url = `${BASE_URL}?method=geo.gettopartists&country=spain&api_key=${encodeURIComponent(API_KEY)}&format=json`

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => data.topartists.artist)
  .then(artists => artists.map((artist: ArtistResource) => {
    const bestImage = [...artist.image]
      .reverse()
      .find(img => img['#text'])

    return {
      id: artist.mbid,
      name: artist.name,
      image: bestImage?.['#text'] ?? ''
    }
  }))
}
