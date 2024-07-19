"use client";
import { Tables } from "@/database.types";
import { useState } from "react";
import s from "../Featured/Featured.module.css";
import { featuredProducts } from "@/data";
import { priceTag } from "@/lib/priceTage";
import Button from "./Button/Button";
import ProductImage from "./ProductImage";
import { addToCart } from "@/app/features/slices/cartSlice";
import { useAppDispatch } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { isNewProduct } from "@/lib/isNewProduct";
import toast from "react-hot-toast";

interface ProoductCardProps {
  product: Tables<"products">;
}
const ProductCard = ({ product }: ProoductCardProps) => {
  const [image, setImage] = useState<string | null>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isNew = isNewProduct(product.created_at);
  const determineIfItemIsPizza = !!(
    product?.size_large ||
    product?.size_medium ||
    product?.size_small
  );

  function addProductToCart(product: Tables<"products">) {
    if (!product) return;

    if (determineIfItemIsPizza) {
      dispatch(addToCart({ product, size: "XL" }));
    } else {
      dispatch(addToCart({ product, size: null }));
    }

    toast.success("item added to cart");

    // router.push(`/product/${product.id}`);
  }

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
        <Button variant="slim" onClick={() => addProductToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
