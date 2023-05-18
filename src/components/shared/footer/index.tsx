import { component$ } from '@builder.io/qwik'

export const Footer = component$(() => {
  return (
    <footer class='w-full px-5 py-1 flex flex-col md:flex-row items-center justify-between'>
      <div class='flex flex-col md:flex-row items-center gap-2'>
        <p class='font-medium'>App hecha en @Qwik /</p>
        <p class='font-medium'>Desarollada por @ivanosquis10</p>
      </div>
      <p class='font-medium'>Inspirado en el curso de Fernando H❤️</p>
    </footer>
  )
})
