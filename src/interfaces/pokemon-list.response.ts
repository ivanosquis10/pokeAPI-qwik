export interface PokemonListResponse {
  count: number
  next: string
  previous: string
  results: BaseInfoPokemon[]
}

export interface BaseInfoPokemon {
  name: string
  url: string
}
