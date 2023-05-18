import { createContextId } from '@builder.io/qwik'
import { type SmallPokemonInfo } from '~/interfaces'

export interface PokemonListState {
  currentPage: number
  isLoading: boolean
  pokemons: SmallPokemonInfo[]
}

// ahora vamos a crear un context, debe tener un nombre unico
export const PokemonListContext = createContextId<PokemonListState>(
  'pokemon.list-context'
)
