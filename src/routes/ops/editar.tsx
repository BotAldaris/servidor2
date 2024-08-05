import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ops/editar')({
  component: () => <div>Hello /ops/editar!</div>
})