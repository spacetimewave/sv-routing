import { getContext } from "svelte";
import { readable } from "svelte/store";
import type { RouteLocation } from "./Route";
import type { RouterContext } from "./RouterContext";

export const LOCATION = {};
export const ROUTER = {};
export const HISTORY = {};

export const useLocation = (): ReturnType<typeof readable<RouteLocation>> => 
  getContext(LOCATION);

export const useRouter = (): RouterContext => 
  getContext(ROUTER);

export const useHistory = (): ReturnType<typeof readable<Record<string | number, any>>> => 
  getContext(HISTORY);