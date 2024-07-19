"use client";
import Featured from "@/components/Featured/Featured";
import Offer from "@/components/Offer/Offer";
import SkeletonLoader from "@/components/SkeletonLoader";
import Slider from "@/components/Slider/Slider";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useGetDelivery, useGetProducts } from "@/lib/query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sessionToken, setUser } from "../features/slices/AuthSlice";
import NavBar from "@/components/ui/NavBar";
import ErrorComponent from "@/components/ui/ErrorComponent";

export default function Home() {
  const { data, isLoading, error } = useGetProducts();
  const {
    data: delivery,
    isLoading: isLoadingDelivery,
    error: errorDelivery,
  } = useGetDelivery();
  const { session } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  if (!session) {
    router.push("/login");
  }
  if (isLoading && isLoadingDelivery) {
    return <SkeletonLoader />;
  }
  if (error) {
    if (error.message === "JWT expired") {
      dispatch(
        sessionToken({
          session: null,
        })
      );
      dispatch(setUser({ user: null }));
      return <ErrorComponent name={error.name} message={error.message} />;
    }
    return <ErrorComponent name={error.name} message={error.message} />;
  }
  if (errorDelivery) {
    toast(errorDelivery.message);
  }

  return (
    <main>
      <NavBar />
      {delivery && data && <Offer delivery={delivery as any} products={data} />}
      <Slider />
      {data && <Featured products={data} />}
    </main>
  );
}
