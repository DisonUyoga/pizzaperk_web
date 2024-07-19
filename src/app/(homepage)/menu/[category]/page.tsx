"use client";
import { useEffect, useState } from "react";

import { useGetProducts } from "@/lib/query";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import SkeletonLoader from "@/components/SkeletonLoader";
import CardItem from "@/components/ui/CardItem";
import ErrorComponent from "@/components/ui/ErrorComponent";
import { useAppSelector } from "@/lib/hook";
import { Tables } from "@/type";
import {
  Box,
  SimpleGrid,
  Spinner,
  Text,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

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
          <Box bg={"#161622"} h={"100vh"} w={"100vw"}>
            <Spinner
              color="#FF9C01"
              alignContent={"center"}
              justifyContent={"center"}
            />
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default CategoryPage;
