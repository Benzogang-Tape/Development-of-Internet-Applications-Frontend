import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RoofingMaterial } from "../types";

interface MaterialsState {
    searchQuery: string;
    materials: RoofingMaterial[];
    loading: boolean;
}

const materialsSlice = createSlice({
    name: "materials",
    initialState: {
        searchQuery: "",
        materials: [],
        loading: false,
    } as MaterialsState,
    reducers: {
        setSearchQuery(state, { payload }: { payload: string }) {
            state.searchQuery = payload;
        },
        setMaterials(state, { payload }: { payload: RoofingMaterial[] }) {
            state.materials = payload;
        },
        setLoading(state, { payload }: { payload: boolean }) {
            state.loading = payload;
        },
    },
});

// Селекторы
export const useSearchQuery = () =>
    useSelector((state: { materials: MaterialsState }) => state.materials.searchQuery);

export const useMaterials = () =>
    useSelector((state: { materials: MaterialsState }) => state.materials.materials);

export const useMaterialsLoading = () =>
    useSelector((state: { materials: MaterialsState }) => state.materials.loading);

// Actions
export const {
    setSearchQuery: setSearchQueryAction,
    setMaterials: setMaterialsAction,
    setLoading: setLoadingAction,
} = materialsSlice.actions;

export default materialsSlice.reducer;
