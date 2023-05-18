import { component$ } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'

import { usePokemonGame } from '~/hooks/usePokemonGame'

import { EyeClose, EyeOpen, TurnIcon } from '~/components/icons'
import { PokemonImage } from '~/components/pokemons/pokemon-image'

export const usePokemonID = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id)

  // vamos a verificar SI el parametro que viene en la url da un NaN
  if (isNaN(id)) redirect(301, '/')
  if (id <= 0) redirect(301, '/')
  if (id >= 1011) redirect(301, '/')

  return id
})

export default component$(() => {
  const { isVisible, toggleImage, handleToggleImage, handleIsVisibleImage } =
    usePokemonGame()
  const id = usePokemonID()
  return (
    <section class='flex flex-col items-center justify-center'>
      <h3 class='text-4xl font-bold uppercase mt-5'>Pokemon {id} </h3>
      <PokemonImage
        id={id.value}
        isVisible={isVisible.value}
        backImage={toggleImage.value}
      />

      <div class='flex items-center justify-center gap-2 w-1/2'>
        <button
          onClick$={handleToggleImage}
          class='w-full px-4 py-2 rounded-lg bg-rose-700 hover:bg-rose-900 tracking-wider font-medium transition-colors'
        >
          <TurnIcon />
        </button>
        <button
          onClick$={handleIsVisibleImage}
          class='w-full px-4 py-2 rounded-lg bg-rose-700 hover:bg-rose-900 tracking-wider font-medium transition-colors'
        >
          {isVisible.value ? <EyeOpen /> : <EyeClose />}
        </button>
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'PokeAPI | Pokemon',
}
