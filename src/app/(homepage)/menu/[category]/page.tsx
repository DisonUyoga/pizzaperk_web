"use client";
import { useEffect, useState } from "react";

import { useGetProducts } from "@/lib/query";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import CardItem from "@/components/ui/CardItem";
import ErrorComponent from "@/components/ui/ErrorComponent";
import { useAppSelector } from "@/lib/hook";
import { Tables } from "@/type";
import { Box, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import Spinner from "@/components/ui/Spinner";
import toast from "react-hot-toast";

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
          if (f.length === 0) {
            toast.error("No items under this category");
            router.back();
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
    return (
      <SimpleGrid
        spacing={2}
        minChildWidth="300px"
        bg="#161622"
        p="10px"
        py={"20px"}
      >
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
      </SimpleGrid>
    );
  }
  if (error) {
    return <ErrorComponent name={error.name} message={error.message} />;
  }
  console.log(filteredData);
  return (
    <Box p="10px" bg="#161622">
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
        {filteredData &&
          filteredData.map((p) => <CardItem key={p.id} product={p} />)}
      </SimpleGrid>
    </Box>
  );
};

export default CategoryPage;
