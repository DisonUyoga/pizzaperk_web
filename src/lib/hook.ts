import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/features/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
