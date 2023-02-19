import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";
import { loadRobotsActionCreator } from "../store/features/robots/robotsSlice";
import { RobotsApiResponseStructure } from "../types";
import { useCallback } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRobotsApi = () => {
  const robotsApiUrl = process.env.REACT_APP_ROBOTS_API_URL;

  const dispatch = useDispatch();

  const getRobotsFromApi = useCallback(async () => {
    try {
      const response = await fetch(robotsApiUrl!);

      const robotsFromApi =
        (await response.json()) as RobotsApiResponseStructure;

      dispatch(loadRobotsActionCreator(robotsFromApi.robots));
    } catch (errorMessage) {
      return (errorMessage as Error).message;
    }
  }, [robotsApiUrl, dispatch]);

  return { getRobotsFromApi };
};

export default useRobotsApi;
