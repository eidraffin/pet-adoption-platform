import Image from 'next/image';

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory

}) => {

    return (
        
        <>
            <div className="pt-3 cursor-pointer pb-6 flex justify-center items-center border-b-4 space-x-10">

                <div 
                    onClick={() => setCategory('Cat')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-4 ${dataCategory == 'Cat' ? 'border-gray-800' : 'border-white'} opacity-70 hover:border-gray-200 hover:opacity-100 transform transition-transform hover:scale-105`}
                >
                    <Image
                        src="/cat-category.jpg"
                        alt="Category - Cat"
                        width={50}
                        height={50}
                    />
                    <span className='text-xs'>Cat</span>
                </div>

                <div 
                    onClick={() => setCategory('Dog')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-4 ${dataCategory == 'Dog' ? 'border-gray-800' : 'border-white'} opacity-70 hover:border-gray-200 hover:opacity-100 transform transition-transform hover:scale-105`}
                >
                    <Image
                        src="/dog-category.jpg"
                        alt="Category - Dog"
                        width={50}
                        height={50}
                    />
                    <span className='text-xs'>Dog</span>
                </div>

                <div 
                    onClick={() => setCategory('Rabbit')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-4 ${dataCategory == 'Rabbit' ? 'border-gray-800' : 'border-white'} opacity-70 hover:border-gray-200 hover:opacity-100 transform transition-transform hover:scale-105`}
                >
                    <Image
                        src="/rabbit-category.jpg"
                        alt="Category - Rabbit"
                        width={50}
                        height={50}
                    />
                    <span className='text-xs'>Rabbit</span>
                </div>

                <div 
                    onClick={() => setCategory('Bird')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-4 ${dataCategory == 'Bird' ? 'border-gray-800' : 'border-white'} opacity-70 hover:border-gray-200 hover:opacity-100 transform transition-transform hover:scale-105`}
                >
                    <Image
                        src="/bird-category.jpg"
                        alt="Category - Bird"
                        width={50}
                        height={50}
                    />
                    <span className='text-xs'>Bird</span>
                </div>

            </div>
            
        </>
    )
}

export default Categories;