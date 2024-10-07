import { Product, Products } from "@/types/types";
import { Store } from "lucide-react";
import Image from "next/image";

interface ResultsCardProps {
  products: Product;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ products }) => {
  return (
    <div className="border-t border-zinc-200 w-full">
      <div className="flex gap-2 py-4">
        <div className="min-w-[100px]">
          {products.img ? (
            <Image
              src={products.img}
              alt={products.title}
              width={100}
              height={100}
            />
          ) : (
            <span>No hay imagen</span>
          )}
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-zinc-900 ">
            <a href={products.link}>{products.title}</a>
          </h2>
          <p className="text-zinc-500 font-semibold">{products.price}</p>
          {products.description && (
            <p className="text-zinc-500">{products.description}</p>
          )}
          <p className="text-zinc-800 font-semibold flex gap-1 items-center">
            <Store className="size-4 text-red-800" />
            {products.store}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
