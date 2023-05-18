import {
  component$,
  useOnDocument,
  useTask$,
  $,
  useContext,
} from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'

import { getSmallPokemons } from '~/services/getSmallPokemons'

import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { PokemonListContext } from '~/context'

export default component$(() => {
  // asi se consume el context
  const pokemonState = useContext(PokemonListContext)
  // const { goToPokemon } = usePokemonGame()

  // solo lo ve el cliente, en el frontend
  // useVisibleTask$(async ({ track }) => {
  //   // el track funciona como un useEffect con dependencia, va a seguir o trackear lo que suceda en el currentPage
  //   track(() => pokemonState.currentPage)

  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10)
  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
  // })

  // este se ven tanto en frontend, como en backend
  useTask$(async ({ track }) => {
    // el track funciona como un useEffect con dependencia, va a seguir o trackear lo que suceda en el currentPage
    track(() => pokemonState.currentPage)

    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30)
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]

    // cambiar el estado del loading a uso estado por defecto
    pokemonState.isLoading = false
  })

  // esto se va a encargar del infiniteScroll
  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight
      const currentScroll = window.scrollY + window.innerHeight

      if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true
        pokemonState.currentPage++
      }
    })
  )

  return (
    <section class='container mx-auto'>
      <div class='flex flex-col md:flex-row items-center'>
        <h3 class='my-2 text-3xl font-bold uppercase'>Current Status:</h3>
        <p class='text-2xl font-medium'>
          Pagina actual:{' '}
          <span class='font-bold'>{pokemonState.currentPage}</span>
        </p>
      </div>

      <div class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-5 py-1'>
        {pokemonState.pokemons.map(({ name, id }) => (
          <div
            key={name}
            class='uppercase w-full flex flex-col items-center rounded-md bg-zinc-800/70 hover:bg-rose-800 ease-in-out duration-200'
          >
            <p class='text-center tracking-wider font-bold py-2'>{name}</p>
            <PokemonImage size={150} id={id} />
          </div>
        ))}
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'PokeAPI | Mix',
}
