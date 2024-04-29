import { create } from "zustand";

interface AdoptionRequestModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAdoptionRequestModal = create<AdoptionRequestModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })

}));

export default useAdoptionRequestModal;