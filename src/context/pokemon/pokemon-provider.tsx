import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik'

import {
  PokemonGameContext,
  type PokemonGameState,
} from './pokemon-game.context'

import {
  PokemonListContext,
  type PokemonListState,
} from './pokemon-list.context'

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonID: 1,
    isVisible: true,
    toggleImage: false,
  })

  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  })

  useContextProvider(PokemonGameContext, pokemonGame)
  useContextProvider(PokemonListContext, pokemonList)

  // vamos a utilizar el usevisibletask para verificar el localstorage y guardar los datos ahi

  // esto permite que se cargue el pokkemon en el ultimo que lo dejo el usuario
  // useVisibleTask$(() => {
  //   // TODO: leer los datos del LS
  //   if (localStorage.getItem('pokemon-game')) {
  //     const {
  //       isVisible = true,
  //       pokemonID = 10,
  //       toggleImage = false,
  //     } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState

  //     pokemonGame.isVisible = isVisible
  //     pokemonGame.pokemonID = pokemonID
  //     pokemonGame.toggleImage = toggleImage
  //   }
  // })

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.isVisible,
      pokemonGame.pokemonID,
      pokemonGame.toggleImage,
    ])

    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
  })

  return <Slot />
})
