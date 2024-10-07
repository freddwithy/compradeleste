"use client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderCircle, Sparkles } from "lucide-react";
import { z } from "zod";
import { useProductsStore } from "@/app/store/results";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadingStore } from "@/app/store/loading";

const formSchema = z.object({
  search: z.string().min(1, { message: "Por favor ingresa un valor" }),
});

const SearchForm = () => {
  const { loading, setLoading } = useLoadingStore();
  const { setProducts } = useProductsStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (data) {
        const res = await fetch("/api/products", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const products = await res.json();

        const resAI = await fetch("/api/generate", {
            method: "POST",
            body: JSON.stringify({ 
              search: data.search,
              data: products
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });

        const results = await resAI.json();

        setProducts(results);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col gap-2 justify-start">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex gap-2"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Ingresa el nombre del articulo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="gap-2">
            {loading && (
              <LoaderCircle className="animate-spin size-4 text-white transition-all" />
            )}
            {!loading && <Sparkles className="size-4 text-white transition-all" />}
            Buscar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchForm;
