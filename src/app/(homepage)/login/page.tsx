"use client";
import Button from "@/components/ui/Button";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../../firebase";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { supabase } from "@/lib/supabase";
import {
  processingAuth,
  sessionToken,
  setAdmin,
  setProfileData,
  setUser,
} from "../../features/slices/AuthSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { session, user, authLoading } = useAppSelector((state) => state.auth);
  if (session) {
    return router.push("/");
  }

  const handleGoogleClick = async () => {
    dispatch(processingAuth({ authLoading: true }));
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const name = result.user.displayName;
      const email = result.user.email;

      const photo = result.user.photoURL;

      if (!name || !email) return;

      googleSignIn(email, name);
    } catch (error) {
      console.log("could not sign in with google", error);
    } finally {
      dispatch(processingAuth({ authLoading: false }));
    }
  };

  async function googleSignIn(email: string, name: string) {
    dispatch(processingAuth({ authLoading: true }));

    try {
      const { error: supabaseError } = await supabase.auth.signUp({
        email,
        password: name,
      });
      if (!supabaseError?.message || "User already registered") {
        await login(email, name);
      } else {
        if (supabaseError?.message !== "User already registered") {
          toast(supabaseError?.message);
        }
      }
    } catch (error) {
    } finally {
      dispatch(processingAuth({ authLoading: false }));
    }
  }
  async function login(email: string, name: string) {
    const { error: supabaseErrorLogin } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: name,
      });
    if (!supabaseErrorLogin?.message) {
      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        toast("login successfull");
        dispatch(
          sessionToken({
            session: {
              email: email,
              name: name,
            },
          })
        );
        dispatch(setUser({ user: data.session }));
        dispatch(processingAuth({ authLoading: false }));
        if (data.session) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.session.user.id)
            .single();

          dispatch(setProfileData({ profile: profileData }));
          dispatch(
            setAdmin({ isAdmin: profileData?.group === "ADMIN" ? true : false })
          );
          dispatch(processingAuth({ authLoading: false }));
        }
      }
      return;
    }
  }

  return (
    <div className="p-3 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center bg-primary">
      {/* BOX  */}
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        {/* IMG CONTAINER  */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image
            src="/loginBg.png"
            alt=""
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded"
            priority
          />
        </div>
        {/* FORM CONTAINER  */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl text-white">Welcome</h1>
          <p className="text-gray-100">
            Log into your account or create a new one using social buttons
          </p>

          <button
            className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md"
            onClick={handleGoogleClick}
          >
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="text-red-500">Sign in with Google</span>
          </button>
          <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded-md">
            <Image
              src="/facebook.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="text-blue-700">Sign in with Facebook</span>
          </button>
          <p className="text-sm text-gray-100">
            Don't have an account?{" "}
            <Link
              className="underline text-blue-700"
              href="https://wa.me/254702122421"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
function signInSuccess(res: any): any {
  throw new Error("Function not implemented.");
}
