import { component$ } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import { useCounter } from '~/hooks/useCounter'

export default component$(() => {
  const { counter, handleDecrement, handleIncrement } = useCounter()

  return (
    <section class='container mx-auto text-center'>
      <h3 class='text-5xl'>Counter</h3>
      <p class='text-8xl'>{counter.value}</p>

      <div class='flex items-center justify-center gap-5 mt-2'>
        <button
          class='px-2 py-1 rounded bg-rose-500 font-bold text-white '
          onClick$={handleDecrement}
        >
          -1
        </button>
        <button
          class='px-2 py-1 rounded bg-rose-500 font-bold text-white '
          onClick$={handleIncrement}
        >
          +1
        </button>
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'PokeAPI | PokeCounter',
  meta: [
    {
      name: 'description',
      content:
        'Primera aplicacion con Qkiw, haciendo una aplicacion de pokemons',
    },
  ],
}
