"use client";

import Image from "next/image";
import cn from "clsx";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import s from "./Slider.module.css";
import Button from "../ui/Button";

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

interface Props {
  className?: string;
  // product: Product;
  // noNameTag?: boolean;
  // imgProps?: Omit<ImageProps, "src" | "layout" | "placeholder" | "blurDataURL">;
  variant?: "default" | "slim" | "simple";
}

const Slider: FC<Props> = ({ className, variant }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderClassName = cn(s.slider_container, {});

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      5000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn(s.slider_container)}>
      {/* TEXT CONTAINER */}
      <div className={s.slider_hero_header}>
        <h1
          className={cn(s.slider_header)}
          data-aos="zoom-in-up"
          data-aos-duration="2000"
        >
          {data[currentSlide].title}
        </h1>
        {/* <button className="bg-secondary text-white py-4 px-8">Order Now</button> */}
        <Button variant="naked">Order Now</Button>
      </div>
      {/* IMAGE CONTAINER  */}
      <div
        className="flex-1 w-full relative "
        data-aos="fade-left"
        data-aos-duration="1500"
      >
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Slider;
