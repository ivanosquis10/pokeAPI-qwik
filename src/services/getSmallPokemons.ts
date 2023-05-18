import type { PokemonListResponse, SmallPokemonInfo } from '~/interfaces'

export const getSmallPokemons = async (
  offset: number = 0,
  limit: number = 10
): Promise<SmallPokemonInfo[]> => {
  const url = 'https://pokeapi.co/api/v2/pokemon?'
  const res = await fetch(`${url}limit=${limit}&offset=${offset}`)
  const data = (await res.json()) as PokemonListResponse

  return data.results.map(({ url, name }) => {
    const segmento = url.split('/')
    const id = segmento.slice(6)[0]

    return {
      id,
      name,
    }
  })
}
