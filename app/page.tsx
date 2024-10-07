"use client";
import SearchForm from "@/components/searchForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProductsStore } from "./store/results";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoadingStore } from "./store/loading";
import ResultsCard from "@/components/resultsCard";

export default function Home() {
  const { loading } = useLoadingStore();
  const { products } = useProductsStore();
  console.log( products.results);
  
  return (
    <div className="w-[600px] mx-auto h-dvh flex items-center justify-center flex-col gap-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Buscar</CardTitle>
          <CardDescription>
            Busca el producto que quieras con mejor precio en todo Ciudad Del
            Este
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchForm />
        </CardContent>
      </Card>
      {products.results && products.results.length > 0 && <Card className="w-full overflow-y-scroll">
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>Resultados de la busqueda</CardDescription>
        </CardHeader>
        <CardContent >
          {loading === false &&
            products.results.map((product) => (
              <ResultsCard key={product.title} products={product}/>
            ))
          }
          {loading && (
            <div className="border-t border-zinc-300 w-full">
              <div className="flex gap-2 py-4">
                <Skeleton className="w-24 h-24" />
                <div className="space-y-1">
                  <Skeleton className="w-96 h-4" />
                  <Skeleton className="w-44 h-4" />
                  <Skeleton className="w-24 h-4 mt-4" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>}
    </div>
  );
}
