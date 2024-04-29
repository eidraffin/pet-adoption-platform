'use client';

import { FaFilter } from "react-icons/fa";
import useSearchModal from "../hooks/useSearchModal";

const FilterButton = () => { 
    const searchModal = useSearchModal();

    return (
        <button
            onClick={() => searchModal.open('location')}
            className="flex items-center gap-2 text-gray-700 text-2xl font-bold border border-gray-300 rounded-xl px-3 py-1 mt-4 transition-transform hover:scale-105">
            <div className="p-2 border-r border-gray-300 pr-2 flex items-center">
                <FaFilter className="w-4 h-4 mb-0.5" />
            </div>
            Filter
        </button>
    );
}

export default FilterButton;
