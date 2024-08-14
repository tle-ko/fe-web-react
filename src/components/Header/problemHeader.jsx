export default function ProblemHeader({ title }) {
  return (
    <div className="w-full bg-white border-b border-gray-200 py-4 flex flex-row justify-between align-center">
      <p className="px-[7.5rem] font-cafe24 text-2xl">{title}</p>
    </div>
  )
}