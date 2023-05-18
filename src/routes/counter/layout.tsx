import { component$, Slot } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <div class='flex flex-col mt-20 justify-center items-center'>
      <Link href='/' class='bg-rose-700 p-2 rounded-md  font-bold uppercase'>
        regresar
      </Link>
      <Slot />
    </div>
  )
})
