export default function ProblemHeader({ title }) {
  return (
    <div className="align-center flex w-full flex-row justify-between border-b border-gray-200 bg-white py-4">
      <p className="pl-[7.5rem] font-cafe24 text-2xl">{title}</p>
    </div>
  );
}
