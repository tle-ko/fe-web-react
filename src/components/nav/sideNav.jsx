import { useEffect } from 'react';

export default function SideNav({ elements, setSelectedElement, selectedElement }) {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 첫 번째 요소를 선택하도록 설정
    if (!selectedElement) {
      setSelectedElement(elements[0]);
    }
  }, [elements, setSelectedElement, selectedElement]);

  return (
    <div className="box w-1/4 h-fit flex-col justify-start items-start gap-4 inline-flex mr-4">
      {elements.map((element, index) => (
        <div key={index} 
             className={`w-full flex-col justify-start items-start gap-3 flex cursor-pointer ${selectedElement === element ? 'bg-color-blue-w25 w-full text-blue-500 rounded' : 'text-black'}`}
             onClick={() => setSelectedElement(element)} 
        >
          <div className={`px-4 py-3 rounded justify-start items-start inline-flex cursor-pointer ${selectedElement === element ? 'text-blue-500' : 'text-black'}`}>
            <p className="text-base font-semibold">{element}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
