import { $, useComputed$, useContext } from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import { PokemonGameContext } from '~/context'

export const usePokemonGame = () => {
  // asi se consume el context
  const pokemonGame = useContext(PokemonGameContext)

  const nav = useNavigate()

  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonID + value <= 0) return

    pokemonGame.pokemonID += value
  })

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonGame.pokemonID}/`)
  })

  const handleToggleImage = $(() => {
    return (pokemonGame.toggleImage = !pokemonGame.toggleImage)
  })

  const handleIsVisibleImage = $(() => {
    return (pokemonGame.isVisible = !pokemonGame.isVisible)
  })

  return {
    pokemonID: useComputed$(() => pokemonGame.pokemonID),
    toggleImage: useComputed$(() => pokemonGame.toggleImage),
    isVisible: useComputed$(() => pokemonGame.isVisible),
    nextPokemon: $(() => changePokemonId(+1)),
    prevPokemon: $(() => changePokemonId(-1)),
    goToPokemon,
    handleToggleImage,
    handleIsVisibleImage,
  }
}
