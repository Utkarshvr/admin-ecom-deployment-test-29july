"use client";

import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean; // Extend Axios request config with custom property
}
interface ErrorResponse {
  message: string;
  // other properties
}

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useLayoutEffect(() => {
    const fullfilledInterceptor = (response: AxiosResponse) => {
      //   console.log({ INTERCEPTOR_RES: response });
      return response;
    };

    const errorInterceptor = async (error: AxiosError) => {
      const originalRequest = error.config as ExtendedAxiosRequestConfig;
      //   console.log({ AXIOS_ERROR: error });
      // If the error is due to an expired token
      if (
        originalRequest &&
        error.response?.status === 401 &&
        (error.response?.data as ErrorResponse)?.message ===
          "You are no authenticated.Please login again !"
      ) {
        router.replace("/admin/sign-in");
        toast({ title: "Token expired! Sign In again" });
      }

      return Promise.reject(error);
    };

    const interceptor = axiosInstance.interceptors.response.use(
      fullfilledInterceptor,
      errorInterceptor
    );

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, []);

  return <>{children}</>;
};

export default AxiosInterceptor;
