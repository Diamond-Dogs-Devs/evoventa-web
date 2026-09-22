// src/app/product/[id]/page.tsx
interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <div>
      <h1>Producto {id}</h1>
    </div>
  );
}
