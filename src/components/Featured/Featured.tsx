"use client";

import { Tables } from "@/database.types";
import ProductCard from "../ui/ProductCard";
import s from "./Featured.module.css";

interface FeaturedProps {
  products: Tables<"products">[];
}
const Featured = ({ products }: FeaturedProps) => {
  return (
    <div className={s.container}>
      {/* WRAPPER */}
      <div className={s.child_container}>
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
