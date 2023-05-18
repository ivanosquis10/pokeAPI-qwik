import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik'
import { Spinner } from '../shared/spinner/spinner'

interface Props {
  id: number | string
  size?: number
  backImage?: boolean
  isVisible?: boolean
}

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false, isVisible = true }: Props) => {
    const loadedImage = useSignal(false)

    // hook que nos permite disparar efectos secundarios
    useTask$(({ track }) => {
      track(() => id)
      loadedImage.value = false
    })

    const computedImageURL = useComputed$(() => {
      if (id === '') return

      return backImage
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    })

    return (
      <div class={`flex items-center justify-center w-40 h-40`}>
        {!loadedImage.value && <Spinner />}
        <img
          width={size}
          height={size}
          src={computedImageURL.value}
          alt='Imagen del pokemon'
          class={[
            {
              hidden: !loadedImage.value,
              'brightness-0': !isVisible,
            },
            'transition-all',
          ]}
          onLoad$={() => (loadedImage.value = true)}
        />
      </div>
    )
  }
)
