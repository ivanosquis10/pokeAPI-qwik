import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
} from '@builder.io/qwik'
import {
  Link,
  type DocumentHead,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city'
import type { SmallPokemonInfo } from '~/interfaces'
import { getSmallPokemons } from '~/services/getSmallPokemons'
import { Modal } from '~/components/shared/modal/modal'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
// import { Spinner } from '~/components/shared/spinner/spinner'
// import { getFunFactAboutPokemon } from '~/services/getResponseAi'

export const usePokemonList = routeLoader$<SmallPokemonInfo[]>(
  async ({ query, redirect, pathname }) => {
    // vamos a verificar si es un numero valido o si la url es valida, para asi evitar que se cree en el lado del cliente
    // acuerdate que todo esto se valida en el SERVIDOR, no lleg al cliente si la condicion no lo permite
    const offset = Number(query.get('offset') || '0')
    if (isNaN(offset)) redirect(301, pathname)
    if (offset < 0) redirect(301, pathname)

    const pokemons = await getSmallPokemons(offset)
    return pokemons
  }
)

export default component$(() => {
  const location = useLocation()
  const pokemonList = usePokemonList()

  const showModal = useSignal(false)
  const pokemonModal = useStore({
    id: '',
    name: '',
  })

  // const responsePokemonFunFact = useSignal('')

  const handleOpenModal = $((id: string, name: string) => {
    pokemonModal.id = id
    pokemonModal.name = name
    showModal.value = true
  })

  const handleCloseModal = $(() => {
    showModal.value = false
  })

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search)

    return Number(offsetString.get('offset') || 0)
  })

  // useVisibleTask$(({ track }) => {
  //   track(() => pokemonModal.name)
  //   // reseteamos el valor del signal, por si acaso
  //   responsePokemonFunFact.value = ''

  //   if (pokemonModal.name.length > 0) {
  //     getFunFactAboutPokemon(pokemonModal.name).then(
  //       res => (responsePokemonFunFact.value = res)
  //     )
  //   }
  // })

  return (
    <section class='w-full container mx-auto'>
      <div class='flex flex-col md:flex-row items-center gap-5'>
        <h3 class='my-2 text-3xl font-bold uppercase'>Current Status:</h3>
        <p class='text-2xl font-medium'>
          Pagina actual (offset): <span class='font-bold'>{currentOffset}</span>
        </p>
      </div>

      <div class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 relative mt-5 px-2 md:px-0 py-1'>
        {pokemonList.value.map(({ name, id }) => (
          <div
            onClick$={() => handleOpenModal(id, name)}
            key={name}
            class='bg-zinc-800/70 hover:bg-rose-800 ease-in-out duration-200 rounded-md capitalize w-full flex flex-col items-center shadow'
          >
            {/* <p class='text-center'>{name}</p> */}
            <PokemonImage size={150} id={id} />
          </div>
        ))}
      </div>

      <div class='mt-5 flex items-center text-center gap-2 w-11/12 md:w-6/12 mx-auto mb-10 md:mb-0'>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class={`w-full px-4 py-2 rounded-lg bg-rose-600 tracking-wider font-medium hover:bg-rose-700 transition-colors cursor-pointer ${
            currentOffset.value === 0 && 'pointer-events-none'
          } `}
        >
          Prev
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class='w-full px-4 py-2 rounded-lg bg-rose-600 tracking-wider font-medium hover:bg-rose-700 transition-colors cursor-pointer'
        >
          Next
        </Link>
      </div>

      <Modal
        persistente
        showModal={showModal.value}
        closeModal={handleCloseModal}
      >
        <div q:slot='title'>{pokemonModal.name}</div>
        <div q:slot='content' class='flex flex-col items-center justify-center'>
          <PokemonImage id={pokemonModal.id} />
          <p>Aquí hay un random fact del pokemon generado por ChatGPT :D</p>
          {/* <div class='font-medium '>
            {responsePokemonFunFact.value === '' ? (
              <Spinner />
            ) : (
              responsePokemonFunFact
            )}
          </div> */}
        </div>
      </Modal>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'PokeAPI | SSR',
}
