"use client";
import { pizzas } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetProducts } from "@/lib/query";

import SkeletonLoader from "@/components/SkeletonLoader";
import toast from "react-hot-toast";
import { Tables } from "@/type";
import ProductImage from "@/components/ui/ProductImage";
import { priceTag } from "@/lib/priceTage";
import { discountCalculator } from "@/lib/discountCalculator";
import CardItem from "@/components/ui/CardItem";
import { SimpleGrid, Spinner, Text, Box } from "@chakra-ui/react";
import { useAppSelector } from "@/lib/hook";

const CategoryPage = () => {
  const { category } = useParams();
  const searchParams = useSearchParams();
  const { data, error, isLoading } = useGetProducts();
  const [filteredData, setFilteredData] = useState<Tables<"products">[] | null>(
    null
  );
  const router = useRouter();
  const { session } = useAppSelector((state) => state.auth);
  const id = parseInt(category as string);
  const cat = searchParams.get("category");

  useEffect(() => {
    const filterCategory = () => {
      try {
        if (data) {
          const f = data.filter((p) => p.category_id === id);
          if (f.length > 0) {
            setFilteredData(f);
          }
        }
      } catch (error) {}
    };
    filterCategory();
  }, [data]);
  if (!session) {
    return router.push("/login");
  }
  if (isLoading) {
    return <SkeletonLoader />;
  }
  if (error) {
    return toast(error?.message);
  }
  console.log(filteredData);
  return (
    <Box p="10px">
      {cat && (
        <Text
          color={"#fff"}
          fontSize={"xl"}
          fontWeight={"600"}
          textAlign={"center"}
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          {cat}
        </Text>
      )}
      <SimpleGrid
        spacing={2}
        minChildWidth="300px"
        bg="#161622"
        position={"relative"}
        py={"20px"}
      >
        {filteredData ? (
          filteredData.map((p) => <CardItem key={p.id} product={p} />)
        ) : (
          <Spinner />
        )}
      </SimpleGrid>
    </Box>
  );
};

export default CategoryPage;
