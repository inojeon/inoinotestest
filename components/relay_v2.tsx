import axios from "axios";

type Prop = {
  relays: any[];
  device: string;
};

const NewRelay = ({ relays, device }: Prop) => {
  const clickRelayButton = (relay: boolean, key: number) => {
    axios
      .get(`/api/update/`, {
        params: {
          device,
          key,
          value: relay,
        },
      })
      .then((res) => {
        // console.log(res);
      });
  };

  return (
    <div className="grid grid-cols-7 items-center w-full gap-y-2 gap-x-2 my-2 md:grid-cols-7">
      <h1 className="col-span-2 text-2xl text-center sm:ml-4 sm:mr-10 md:mr-2 md:ml-2 md:col-span-1">
        전원제어
      </h1>
      <div className="col-span-5 flex flex-wrap w-full md:col-span-6">
        {relays.map((relay, key) => (
          <div key={key} className="flex gap-x-2 px-2 py-2">
            <div className="flex items-center">
              <p className="text-center text-lg w-8"> CH{key + 1} </p>
            </div>

            {relay ? (
              <div className="flex justify-center items-center ">
                <span className="w-5 h-5 uppercase p-1 flex items-center border border-green-500 bg-green-500 max-w-max shadow-lg rounded-full">
                  <svg width="14" height="14">
                    {" "}
                  </svg>
                </span>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <span className="w-5 h-5 uppercase p-1 flex items-center border  border-green-500  max-w-max shadow-lg rounded-full">
                  <svg width="14" height="14"></svg>
                </span>
              </div>
            )}
            <div className="flex justify-center">
              <div>
                <button
                  onClick={() => {
                    clickRelayButton(relay, key);
                  }}
                  className="flex items-center border py-1 px-2 text-sm rounded-lg"
                >
                  ON/OFF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelay;
