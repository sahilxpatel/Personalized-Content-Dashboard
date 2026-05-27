"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { updateSocialSignals } from "@/features/content/contentSlice";

export const useRealtimeSocialUpdates = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = window.setInterval(() => {
      dispatch(updateSocialSignals());
    }, 12000);

    return () => window.clearInterval(timer);
  }, [dispatch]);
};
