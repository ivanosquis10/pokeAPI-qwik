import { component$, Slot } from '@builder.io/qwik'
import { PokemonProvider } from '~/context'
import Navbar from '~/components/shared/navbar/navbar'

export default component$(() => {
  return (
    <PokemonProvider>
      <Navbar />
      <main class='flex flex-col justify-center items-center'>
        <Slot />
      </main>
    </PokemonProvider>
  )
})
