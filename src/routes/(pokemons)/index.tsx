import { component$ } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import {
  ArrowNext,
  ArrowPrev,
  EyeClose,
  EyeOpen,
  TurnIcon,
} from '~/components/icons'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { Footer } from '~/components/shared/footer'
import { usePokemonGame } from '~/hooks/usePokemonGame'

export default component$(() => {
  const {
    isVisible,
    pokemonID,
    toggleImage,
    nextPokemon,
    prevPokemon,
    goToPokemon,
    handleToggleImage,
    handleIsVisibleImage,
  } = usePokemonGame()

  return (
    <>
      <div>
        <h1 class='text-7xl  font-bold tracking-wide mt-5 bg-gradient-to-br from-red-700  to-rose-500 bg-clip-text text-transparent'>
          Poke API
        </h1>
        <p class='text-2xl text-slate-100 font-medium tracking-widest'>
          ¿Who is that Pokemon?
        </p>
      </div>

      <section class='mt-2 mb-10 md:mb-0 flex flex-col items-center gap-5 w-11/12'>
        <span class='text-5xl font-bold'>{pokemonID.value} </span>

        <div onClick$={goToPokemon} class='cursor-pointer'>
          <PokemonImage
            id={pokemonID.value}
            backImage={toggleImage.value}
            isVisible={isVisible.value}
          />
        </div>

        <div class='flex items-center justify-center gap-2 w-full md:w-1/2'>
          <button
            onClick$={prevPokemon}
            class='rounded-lg bg-rose-700 hover:bg-rose-900 transition-colors p-1'
          >
            <ArrowPrev />
          </button>
          <button
            onClick$={nextPokemon}
            class='rounded-lg bg-rose-700 hover:bg-rose-900 transition-colors p-1'
          >
            <ArrowNext />
          </button>
          <button
            onClick$={handleToggleImage}
            class='rounded-lg bg-rose-700 hover:bg-rose-900 transition-colors p-1'
          >
            <TurnIcon />
          </button>
          <button
            onClick$={handleIsVisibleImage}
            class='rounded-lg bg-rose-700 hover:bg-rose-900 transition-colors p-1'
          >
            {isVisible.value ? <EyeOpen /> : <EyeClose />}
          </button>
        </div>
      </section>
      <Footer />
    </>
  )
})

export const head: DocumentHead = {
  title: 'PokeAPI | Home',
  meta: [
    {
      name: 'description',
      content:
        'Primera aplicacion con Qkiw, haciendo una aplicacion de pokemons',
    },
  ],
}
