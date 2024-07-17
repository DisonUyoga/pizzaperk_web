"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useSupabaseImageDownLoader(path: string | undefined) {
  const [image, setImage] = useState("");
  useEffect(() => {
    if (!path) return;
    (async () => {
      setImage("");
      const { data, error } = await supabase.storage
        .from("product-images")
        .download(path);

      if (error) {
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [path]);
  return image;
}
