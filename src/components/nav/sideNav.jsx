export default function SideNav({ elements }) {
  return (
    <div className="box w-3/5 flex-col justify-start items-start gap-4 inline-flex">
      {elements.map((element, index) => (
        <div key={index} className="flex-col justify-start items-start gap-3 flex">
          <div className="px-4 py-3 bg-white rounded justify-start items-start inline-flex">
            <div className=" text-gray-600 text-base font-semibold">{element}</div>
          </div>
        </div>
      ))}
    </div>
  )
}