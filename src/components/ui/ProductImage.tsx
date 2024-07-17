import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useSupabaseImageDownLoader } from "@/lib/useSupabaseImageDownLoader";
import { ComponentProps } from "react";

type RemoteImageProps = {
  path?: string;
  fallback: string;
};

const ProductImage = ({ path, fallback }: RemoteImageProps) => {
  const image = useSupabaseImageDownLoader(path);

  if (!image) {
  }
  
  return (
    <div>
      {image ? (
        <Image src={image} alt="" fill className="object-cover rounded" />
      ) : (
        <Image
          src={fallback}
          alt=""
          fill
          className="object-cover rounded"
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
