import axios from "axios";

import { env } from "@/lib/env";

export const newsClient = axios.create({
  baseURL: env.newsApiUrl,
  timeout: 10000,
});

export const tmdbClient = axios.create({
  baseURL: env.tmdbApiUrl,
  timeout: 10000,
});
