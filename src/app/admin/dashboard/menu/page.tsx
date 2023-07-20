"use client"
import { useProducts } from "@/app/hooks/useProducts";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';
import ProductsTable from "../components/ProductsTable";

export default function Page(){

  interface Product {
    name: string;
    sku: string;
    price: number;
    stock: number;
    hidden: string;
  }

  const { products } = useProducts()
  const buttonClass = 'text-sm font-medium text-slate-600 bg-white rounded-full px-5 py-2 shadow hover:scale-105 transition'
  const parsedProd = products.map((e: any): Product => {
    return {
      name: e.name,
      sku: e.sku,
      price: e.price,
      stock: e.stock,
      hidden: e.hidden ? 'Oculto' : 'Visible'
    }
  })
  return (
    <div className="bg-slate-100 text-slate-800 rounded-3xl shadow flex flex-col gap-5 p-5 justify-center items-start">
      <div className="flex flex-col gap-4 md:flex-row w-full md:w-auto items-center">
        <Link href='/admin/dashboard/menu/add-product' className={buttonClass}><AddIcon className="mr-1" fontSize="small"/>Cargar producto nuevo</Link>
        <Link href='/' className={buttonClass}><LaunchIcon className="mr-1" fontSize="small"/>Ver menú como cliente</Link>
      </div>
      {parsedProd.length > 0 ? <ProductsTable products={parsedProd}/> : <div className="animate-pulse bg-slate-200 w-full h-72 rounded-3xl"></div>}
    </div>
  )
}