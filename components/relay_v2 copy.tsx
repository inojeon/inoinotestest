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
    <div className="flex items-center w-full gap-y-2 my-4">
      <h1 className="text-2xl text-center ml-4 mr-10">Relay</h1>
      {relays.map((relay, key) => (
        <div key={key} className="flex gap-x-2  mx-2 px-2 py-2">
          <div className="flex items-center">
            <p className="text-center text-lg"> {key}번 </p>
          </div>

          {relay ? (
            <div className="flex justify-center items-center ">
              <button className="w-5 h-5 uppercase p-1 flex items-center border border-red-500 bg-red-500 max-w-max shadow-lg rounded-full">
                <svg width="14" height="14">
                  {" "}
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <button className="w-5 h-5 uppercase p-1 flex items-center border  border-red-500  max-w-max shadow-lg rounded-full">
                <svg width="14" height="14"></svg>
              </button>
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
                Click
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewRelay;
