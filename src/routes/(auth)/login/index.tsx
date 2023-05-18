import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './login.css?inline'
import {
  type DocumentHead,
  Form,
  Link,
  routeAction$,
  z,
  zod$,
} from '@builder.io/qwik-city'

// esto me va a permitir devolver valores, verificar los campos etc, desde el lado del backed
export const useLoginUserAction = routeAction$(
  (data, { cookie, redirect }) => {
    const { email, password } = data

    if (password !== '' || email !== '') {
      const jwt = crypto.randomUUID()
      cookie.set('jwt', jwt, { secure: true, path: '/' })
      redirect(302, '/')
    }

    return {
      success: false,
    }
  },
  zod$({
    email: z.string().email('Formato no válido'),
    password: z.string().min(6, 'Minimo 6 letras'),
  })
)

export default component$(() => {
  useStylesScoped$(styles)

  // consumimos el hook
  const action = useLoginUserAction()

  if (action.value?.fieldErrors) {
    alert('todos los campos son obligatorios')
  }

  return (
    <section class='bg-gray-900'>
      <div class='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div class='flex justify-between items-center mb-6 w-full md:w-1/3 '>
          <h4 class='flex items-center text-3xl font-bold text-white'>
            PokeLogin
          </h4>
          <Link
            class='bg-rose-600 p-2 rounded hover:bg-rose-700 transition-colors font-bold'
            href='/'
          >
            Home
          </Link>
        </div>
        <div class='w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 dark:border-gray-700'>
          <div class='p-6 space-y-4 md:space-y-6 sm:p-8'>
            {/* {FORM} */}
            <Form
              action={action}
              class='space-y-4 md:space-y-6'
              preventdefault:submit
            >
              <div>
                <label
                  for='email'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white not-valid'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  class='outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white'
                  placeholder='name@company.com'
                  autoComplete='off'
                />
              </div>
              <div>
                <label
                  for='password'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  placeholder='••••••••'
                  autoComplete='off'
                  class='outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white'
                />
              </div>

              <div class='flex items-start'>
                <div class='flex items-center h-5'>
                  <input
                    id='terms'
                    aria-describedby='terms'
                    type='checkbox'
                    class='w-4 h-4 rounded bg-gray-700 border-gray-600  '
                    autoComplete='off'
                  />
                </div>
                <div class='ml-3 text-sm'>
                  <label for='terms' class='font-light text-gray-300'>
                    I accept the{' '}
                    <a
                      class='font-medium text-primary-600 hover:underline dark:text-primary-500'
                      href='#'
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type='submit'
                class='w-full text-white bg-rose-700 tracking-widest hover:bg-rose-800 font-medium rounded-lg px-5 py-2.5 text-center'
              >
                Login
              </button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'PokeAPI | Login',
  meta: [
    {
      name: 'description',
      content: 'Inicio de sesion para la pokeAPI',
    },
  ],
}
