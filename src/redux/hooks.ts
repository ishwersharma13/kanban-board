import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useWorkItemDispatch: () => AppDispatch = useDispatch;
export const useWorkItemSelector: TypedUseSelectorHook<RootState> = useSelector;
