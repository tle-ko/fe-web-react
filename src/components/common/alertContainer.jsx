const AlertContainer = ({alertImg, content,}) => {
    return (
        <div className="w-full my-10 flex-col justify-start items-center gap-6 inline-flex">
            <img className="w-12" src={alertImg} alt='' />
            <p className="text-gray-600 text-xl font-medium">{content}</p>
        </div>
  )
}

export default AlertContainer;