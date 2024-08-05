import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ProtectedRoute')({
  component: () => <div>Hello /ProtectedRoute!</div>
})