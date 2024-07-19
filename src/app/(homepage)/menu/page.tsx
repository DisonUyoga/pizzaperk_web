"use client";
import React from "react";

import { menu } from "@/data";
import { useGetCategories } from "@/lib/query";
import SkeletonLoader from "@/components/SkeletonLoader";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/Spinner";
import { useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";
import CategoryCard from "@/components/CategoryCard";
import NextLink from "next/link";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Skeleton,
} from "@chakra-ui/react";
import ProductImage from "@/components/ui/ProductImage";
import ErrorComponent from "@/components/ui/ErrorComponent";

const MenuPage = () => {
  const {
    data: categories,
    error: categoriesError,
    isLoading: isLoadingCategory,
  } = useGetCategories();
  const { session } = useAppSelector((state) => state.auth);
  const router = useRouter();
  if (!session) {
    return router.push("/login");
  }

  if (isLoadingCategory) {
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
  if (categoriesError?.message) {
    return (
      <ErrorComponent
        name={categoriesError.name}
        message={categoriesError.message}
      />
    );
  }
  return (
    <SimpleGrid
      p="10px"
      spacing={10}
      minChildWidth="300px"
      bg="#161622"
      position={"relative"}
      py={"20px"}
    >
      {categories &&
        categories.map((c) => (
          <Card key={c.id} borderTop="4px" borderColor="#FF9C01">
            <CardHeader>
              <Heading
                as="h3"
                size="sm"
                position={"absolute"}
                zIndex={50}
                color={"white"}
              >
                {c.category}
              </Heading>
            </CardHeader>
            <Link as={NextLink} href={`/menu/${c.id}?category=${c.category}`}>
              <CardBody>
                {c.image && menu[0].img && (
                  <ProductImage fallback={menu[0].img} path={c.image} />
                )}
              </CardBody>
            </Link>
          </Card>
        ))}
    </SimpleGrid>
  );
};

export default MenuPage;
