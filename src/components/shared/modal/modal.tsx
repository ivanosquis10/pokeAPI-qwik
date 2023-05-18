import {
  type PropFunction,
  Slot,
  component$,
  useStylesScoped$,
} from '@builder.io/qwik'
import modalStyles from './modal.css?inline'

interface Props {
  showModal: boolean
  persistente?: boolean
  size?: 'sm' | 'md' | 'lg'
  closeModal: PropFunction<() => void>
}

export const Modal = component$(
  ({ showModal, closeModal, persistente, size = 'md' }: Props) => {
    useStylesScoped$(modalStyles)
    return (
      <div
        id='modal-content'
        onClick$={e => {
          const idTarget = (e.target as HTMLDivElement).id
          if (idTarget === 'modal-content' && !persistente) closeModal()
        }}
        class={showModal ? 'modal-background' : 'hidden'}
      >
        {/* !Aquí! */}
        <div class={['modal-content', `modal-${size}`]}>
          <div class='mt-3 text-center'>
            <h3 class='modal-title'>
              <Slot name='title' />
            </h3>

            <div class='mt-2 px-7 py-3'>
              <div class='modal-content-text'>
                <Slot name='content' />
              </div>
            </div>

            {/* Botton */}
            <div class='items-center px-4 py-3'>
              <button onClick$={closeModal} class='modal-button'>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
