export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-8xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">Página no encontrada</h2>

      <p className="mt-2 text-gray-500">La página que buscas no existe.</p>

      <a href="/" className="mt-6 rounded-lg bg-black px-6 py-3 text-white">
        Volver al inicio
      </a>
    </main>
  );
}
