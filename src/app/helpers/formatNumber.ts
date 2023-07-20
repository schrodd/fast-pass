export default function formatPrice(price: number): string {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);

  return formattedPrice;
}
