import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 쿼리 파라미터를 위해

export default function SideNav({ elements, setSelectedElement, selectedElement }) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const selectedFromUrl = searchParams.get('selected');

    if (selectedFromUrl) {
      setSelectedElement(Number(selectedFromUrl));
    } else if (!selectedElement && elements.length > 0) {
      setSelectedElement(elements[0].order);
    }
  }, [elements, setSelectedElement, selectedElement, searchParams]);

  const handleClick = (order) => {
    setSelectedElement(order);
    setSearchParams({ order });
  };

  return (
    <div className="box col-span-1 min-w-fit whitespace-nowrap">
      <div className="inline-flex w-full flex-col items-start gap-4">
        {elements.map((element, index) => (
          <div
            key={index}
            className={`flex w-full cursor-pointer flex-col items-start justify-start ${selectedElement === element.order ? 'w-full rounded bg-color-blue-w25 text-blue-500' : 'group text-black hover:text-blue-500'}`}
            onClick={() => handleClick(element.order)}
          >
            <div
              className={`inline-flex min-w-[20rem] cursor-pointer items-start justify-start rounded px-4 py-3 ${selectedElement === element.order ? 'text-blue-500' : 'text-black group-hover:text-blue-500'}`}
            >
              <p className="text-base font-semibold group-hover:text-blue-500">{element.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
