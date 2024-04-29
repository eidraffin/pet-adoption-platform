import { create } from "zustand";

interface AddPetModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddPetModal = create<AddPetModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })

}));

export default useAddPetModal;