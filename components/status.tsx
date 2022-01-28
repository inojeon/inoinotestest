const StatusLED = ({ status }: { status: boolean }) => (
  <>
    {status ? (
      <div className="flex justify-center ">
        <span className="w-4  h-4 uppercase p-1 flex items-center border border-red-500 bg-red-500 max-w-max shadow-lg rounded-full">
          <svg width="12" height="12">
            {" "}
          </svg>
        </span>
      </div>
    ) : (
      <div className="flex justify-center ">
        <span className="w-4  h-4 uppercase p-1 flex items-center border border-green-500 bg-green-500 max-w-max shadow-lg rounded-full">
          <svg width="12" height="12">
            {" "}
          </svg>
        </span>
      </div>
    )}
  </>
);

export default StatusLED;
