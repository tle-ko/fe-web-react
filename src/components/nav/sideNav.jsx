import { useEffect } from 'react';

export default function SideNav({ elements, setSelectedElement, selectedElement }) {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 첫 번째 요소를 선택하도록 설정
    if (!selectedElement && elements.length > 0) {
      setSelectedElement(elements[0].order); // order로 초기 설정
    }
  }, [elements, setSelectedElement, selectedElement]);

  const handleClick = (order) => {
    setSelectedElement(order);
  };

  return (
    <div className="col-span-1 box whitespace-nowrap min-w-fit">
      <div className="flex-col gap-4 inline-flex items-start w-full">
      {elements.map((element, index) => (
        <div
          key={index}
          className={`w-full flex-col justify-start items-start flex cursor-pointer ${selectedElement === element.order ? 'bg-color-blue-w25 w-full text-blue-500 rounded' : 'text-black hover:text-blue-500 group'}`} // group 추가
          onClick={() => handleClick(element.order)} // order로 클릭 설정 및 새로고침
        >
          <div className={`min-w-[20rem] px-4 py-3 rounded justify-start items-start inline-flex cursor-pointer ${selectedElement === element.order ? 'text-blue-500' : 'text-black group-hover:text-blue-500'}`}>
            <p className="text-base font-semibold group-hover:text-blue-500">{element.label}</p> {/* group-hover 추가 */}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
