import { $, useComputed$, useSignal } from '@builder.io/qwik'

export const useCounter = (initialValue: number = 0) => {
  // Dato a tener en cuenta, no es recomendable que los demas componentes tenga acceso a modificar nuestra "signal", es decir, debemos evitar que sea modificable a menos que sea una funcion especifica que cambie el estado
  // Por lo que debemos de alguna forma hacerla solo de lectura y esto se hace con las "computed$", ejemplo en el return
  const counter = useSignal(initialValue)

  const handleIncrement = $(() => {
    counter.value += 1
  })
  const handleDecrement = $(() => {
    if (counter.value <= 0) return
    counter.value -= 1
  })
  // Si hacemos hover, se puede ver que dice que el valor del counter es "Readonly<Signal<number>>"
  // Por ende, esto evitará que sea modificada directamente
  return {
    counter: useComputed$(() => counter.value),
    handleDecrement,
    handleIncrement,
  }
}
