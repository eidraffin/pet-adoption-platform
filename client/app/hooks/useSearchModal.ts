import { create } from "zustand";

export type SearchQuery = {
    species: string | undefined;
    location: string ;
    age: number;
    price:number;
    gender: string | undefined;
    breed: string;
    size: string | undefined;
    //behaviour: string | undefined;
    spayed_neutered: boolean | undefined;
    is_vaccinated: boolean | undefined;
    keyword: string;
    //other_medical_history: string | undefined;
}

interface SearchModalStore {
    isOpen: boolean;
    step: string;
    open: (step: string) => void;
    close: () => void;
    query: SearchQuery;
    setQuery: (query: SearchQuery) => void;
}


const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    step: '',
    open: (step) => set({isOpen: true, step: step}),
    close: () => set({ isOpen: false }),
    setQuery: (query: SearchQuery) => set({query: query}),
    query: {
        species: '',
        location: '',
        price: 0,
        age: 0,
        gender: '',
        breed: '',
        size: '',
        keyword: '',
        //behaviour: '',
        spayed_neutered: undefined,
        is_vaccinated: undefined,
        //other_medical_history: '',
    }

}));

export default useSearchModal;