import { Fragment, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { BsChevronDown } from "react-icons/bs";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({ dropList }) {
  const [selected, setSelected] = useState(dropList[0]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex items-center justify-center w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:outline-none">
          <span className="truncate">{selected}</span>
          <BsChevronDown className="-mr-1 w-4 h-4 text-gray-600" />
        </MenuButton>
      </div>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {dropList.map((item, index) => (
              <MenuItem key={index}>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm text-left focus:outline-none'
                    )}
                    onClick={() => setSelected(item)}
                  >
                    {item}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}


//z-index 설정 때문에 크루 정보 나오는 곳이랑 홈/문제/관리 하는 부분에서 위에 보이는데,, 모르겠다
