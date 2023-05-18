import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './spinner.css?inline'

interface Props {
  text?: string
  size?: number
}

export const Spinner = component$(({ text, size = 6 }: Props) => {
  useStylesScoped$(styles)
  return (
    // <div class='flex items-center justify-center gap-1'>
    //   <p class='tracking-wider capitalize'>{text}</p>
    //   <div
    //     class={`w-${size} h-${size} rounded-full border-4 border-dotted animate-spin`}
    //   ></div>
    // </div>
    <div class='sk-circle'>
      <div class='sk-circle1 sk-child'></div>
      <div class='sk-circle2 sk-child'></div>
      <div class='sk-circle3 sk-child'></div>
      <div class='sk-circle4 sk-child'></div>
      <div class='sk-circle5 sk-child'></div>
      <div class='sk-circle6 sk-child'></div>
      <div class='sk-circle7 sk-child'></div>
      <div class='sk-circle8 sk-child'></div>
      <div class='sk-circle9 sk-child'></div>
      <div class='sk-circle10 sk-child'></div>
      <div class='sk-circle11 sk-child'></div>
      <div class='sk-circle12 sk-child'></div>
    </div>
  )
})
