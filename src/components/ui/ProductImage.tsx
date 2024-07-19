import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useSupabaseImageDownLoader } from "@/lib/useSupabaseImageDownLoader";
import { ComponentProps } from "react";

type RemoteImageProps = {
  path?: string;
  fallback: string;
  radius?: string;
};

const ProductImage = ({ path, fallback, radius }: RemoteImageProps) => {
  const image = useSupabaseImageDownLoader(path);

  if (!image) {
  }

  return (
    <div>
      {image ? (
        <Image src={image} alt="" fill className="object-cover " />
      ) : (
        <Image
          src={fallback}
          alt=""
          fill
          className={`object-cover ${radius && radius}`}
          style={{
            filter: "blur(20px)",
          }}
        />
      )}
      ;
    </div>
  );
};

export default ProductImage;
