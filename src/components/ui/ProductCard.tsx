"use client";
import { Tables } from "@/database.types";
import { useState } from "react";
import s from "../Featured/Featured.module.css";
import { featuredProducts } from "@/data";
import { priceTag } from "@/lib/priceTage";
import Button from "./Button/Button";
import ProductImage from "./ProductImage";

interface ProoductCardProps {
  product: Tables<"products">;
}
const ProductCard = ({ product }: ProoductCardProps) => {
  const [image, setImage] = useState<string | null>();

  return (
    <div
      className={s.card}
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      data-aos-duration="1500"
    >
      {/* IMAGE CONTAINER */}
      {product.image && (
        <div className={s.img_container}>
          <ProductImage
            fallback={featuredProducts[0].img as string}
            path={product.image as string}
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className={s.card_body}>
        <h1 className={s.card_title}>{product.name}</h1>
        <p className={s.card_desc}>{product.description}</p>
        <span className={s.card_price}>{priceTag(product.price)}</span>
        <Button variant="slim">Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
