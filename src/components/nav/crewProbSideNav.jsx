import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 쿼리 파라미터를 위해

export default function SideNav({ elements, setSelectedElement, selectedElement }) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const selectedFromUrl = searchParams.get('selected');
    
    if (selectedFromUrl) {
      setSelectedElement(Number(selectedFromUrl)); 
    } else if (!selectedElement && elements.length > 0) {
      setSelectedElement(elements[0].id); // 요소의 'id' 사용
    }
  }, [elements, setSelectedElement, selectedElement, searchParams]);

  const handleClick = (id) => {
    setSelectedElement(id); // 클릭 시 'id'를 사용
    setSearchParams({ selected: id }); // URL 쿼리 파라미터에 'selected'로 설정
  };

  return (
    <div className="col-span-1 box whitespace-nowrap min-w-fit">
      <div className="flex-col gap-4 inline-flex items-start w-full">
      {elements.map((element, index) => (
        <div
          key={index}
          className={`w-full flex-col justify-start items-start flex cursor-pointer ${selectedElement === element.id ? 'bg-color-blue-w25 w-full text-blue-500 rounded' : 'text-black hover:text-blue-500 group'}`}
          onClick={() => handleClick(element.id)} // 'id' 사용
        >
          <div className={`min-w-[20rem] px-4 py-3 rounded justify-start items-start inline-flex cursor-pointer ${selectedElement === element.id ? 'text-blue-500' : 'text-black group-hover:text-blue-500'}`}>
            <p className="text-base font-semibold group-hover:text-blue-500">{element.label}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
