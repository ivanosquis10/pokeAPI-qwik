import { createContextId } from '@builder.io/qwik'

export interface PokemonGameState {
  pokemonID: number
  toggleImage: boolean
  isVisible: boolean
}

// ahora vamos a crear un context, debe tener un nombre unico
export const PokemonGameContext = createContextId<PokemonGameState>(
  'pokemon.game-context'
)
