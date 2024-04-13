import { Link, useRouteError } from 'react-router-dom'

// This is definitely the best way to handle errors in your application. It's
// just an example of how you can create a custom error page for your application
// using react-router-dom.
export function AppError() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Whoops, algo aconteceu...</h1>
      <p className="text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>

      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link
          to="/"
          className="text-sky-600 underline-offset-4 hover:underline dark:text-sky-400"
        >
          Dashboard
        </Link>
      </p>
    </div>
  )
}
