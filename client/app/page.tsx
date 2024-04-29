import Categories from "./components/Categories";
import PetList from "./components/pets/PetList";
import Image from "next/image";
import Carousel from "./components/Carousel";
import FilterButton from "./components/FilterButton";

let slides: string[] = [
  "/b1.jpg",
  "/b2.jpg",
  "/b3.jpg",
  "/b4.jpg",
];

export default function Home() {
  return (  
    <main className="max-w-[1650px] mx-auto px-6">
      <Carousel slides={slides}/>
      <Categories />
      <FilterButton/>      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <PetList />
      </div>     
    </main>
  );
}