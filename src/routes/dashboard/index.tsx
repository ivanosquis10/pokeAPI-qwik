import { component$ } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'

// function encargada de verificar si hay un jwt
export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
  const jwtCookie = cookie.get('jwt')
  if (!jwtCookie) {
    redirect(302, '/login')
  }
})

export default component$(() => {
  return (
    <section class='container mx-auto'>
      <h4 class='text-5xl uppercase font-bold text-center mt-5'>
        Admin Dashboard
      </h4>
      <p class='text-xl text-center mt-5'>
        Esto debe ser una ruta privada, solo la puedes ver si estas autenticado!
      </p>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'PokeAPI | Dashboard',
  meta: [
    {
      name: 'description',
      content:
        'Primera aplicacion con Qkiw, haciendo una aplicacion de pokemons',
    },
  ],
}
