import axios from "axios";

type Prop = {
  relays: any[];
  ENDPOINT: string;
  device: string;
};

const NewRelay = ({ relays, ENDPOINT, device }: Prop) => {
  const clickRelayButton = (relay: boolean, key: number) => {
    axios
      .get(`${ENDPOINT}/api/update/`, {
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
    <div className="grid grid-cols-6 items-center w-full gap-y-2 gap-x-2 my-4 md:grid-cols-7">
      <h1 className="col-span-1 text-2xl text-center ml-4 mr-10 md:mr-2 md:ml-2 md:col-span-1">
        Relay
      </h1>
      <div className="col-span-5 flex flex-wrap w-full md:col-span-6">
        {relays.map((relay, key) => (
          <div key={key} className="flex gap-x-2 px-2 py-2">
            <div className="flex items-center">
              <p className="text-center text-lg w-8"> {key + 1}번 </p>
            </div>

            {relay ? (
              <div className="flex justify-center items-center ">
                <span className="w-5 h-5 uppercase p-1 flex items-center border border-red-500 bg-red-500 max-w-max shadow-lg rounded-full">
                  <svg width="14" height="14">
                    {" "}
                  </svg>
                </span>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <span className="w-5 h-5 uppercase p-1 flex items-center border  border-red-500  max-w-max shadow-lg rounded-full">
                  <svg width="14" height="14"></svg>
                </span>
              </div>
            )}
            <div className="flex justify-center">
              <div>
                <button
                  onClick={() => {
                    clickRelayButton(relay, key + 1);
                  }}
                  className="flex items-center border py-1 px-2 text-sm rounded-lg"
                >
                  Click
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
