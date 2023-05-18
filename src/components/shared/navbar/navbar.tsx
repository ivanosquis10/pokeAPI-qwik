import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { QwikLogo } from '../../icons/qwik'

export default component$(() => {
  return (
    <header>
      <div class='flex flex-col md:flex-row items-center justify-between bg-zinc-800 px-2'>
        <div class='inline-block'>
          <Link href='/'>
            <QwikLogo width={150} height={80} />
          </Link>
        </div>
        <nav>
          <ul class='flex flex-col md:flex-row items-center gap-1 md:gap-2 [&>li>a]:uppercase [&>li>a]:tracking-wider [&>li>a]:px-2 [&>li>a]:font-medium '>
            <li class='hover:bg-rose-500/80 rounded shadow shadow-rose-600 py-1 transition-colors duration-300 text-sm md:text-base'>
              <Link href='/'>Home</Link>
            </li>
            <li class='hover:bg-rose-500/80 rounded py-1 transition-colors duration-300 text-sm md:text-base'>
              <Link href='/pokemons/list-ssr/'>Srr-List</Link>
            </li>
            <li class='hover:bg-rose-500/80 rounded  py-1 transition-colors duration-300 text-sm md:text-base'>
              <Link href='/pokemons/list-client/'>Client-List</Link>
            </li>
            <li class='hover:bg-rose-500/80 rounded  py-1 transition-colors duration-300 text-sm md:text-base'>
              <Link href='/dashboard/'>Dashboard</Link>
            </li>
            <li class='hover:bg-rose-500/80 rounded  py-1 transition-colors duration-300 text-sm md:text-base mb-2 md:mb-0'>
              <Link href='/login/'>Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
})
