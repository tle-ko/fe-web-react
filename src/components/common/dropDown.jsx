import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { BsChevronDown } from "react-icons/bs";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown({ dropList }) { // props를 구조 분해 할당을 통해 바로 사용
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex align-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
          정렬
          <BsChevronDown className="-mr-1 w-4 h-4 text-gray-600"/>
        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
              {dropList.map((item, index) => ( // map 함수 사용 시 item과 index 사용
                <MenuItem key={index}> {/* 각 항목에 고유한 key 속성 제공 */}
                {({ active }) => (
                    <a
                    href="#"
                    className={classNames(
                        active ? 'bg-gray-50 text-gray-700' : 'text-gray-600',
                        'block px-4 py-2 text-sm'
                    )}
                    >
                    {item} {/* 직접 item을 사용 */}
                    </a>
                )}
                </MenuItem>
              ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
