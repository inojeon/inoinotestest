import socketIOClient from "socket.io-client";

type Prop = {
  relays: any[];
  ENDPOINT: string;
  device: string;
};

const Relay = ({ relays, ENDPOINT, device }: Prop) => {
  const socket = socketIOClient(ENDPOINT);
  const clickRelayButton = (relay: boolean, key: number) => {
    socket.emit("relay_update", { device, order: key, value: relay });
    // console.log(relay, key);
  };
  return (
    <table className="w-full divide-y border border-white m-2  table-auto">
      <thead>
        <tr>
          <th>No.</th>
          <th>Status</th>
          <th>Control</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {relays.map((relay, key) => (
          <tr key={key} className="">
            <td className="text-center">{key}</td>
            <td>
              {relay ? (
                <div className="flex justify-center ">
                  <button className="w-5  h-5 uppercase p-1 flex items-center border border-red-500 bg-red-500 max-w-max shadow-lg rounded-full">
                    <svg width="14" height="14">
                      {" "}
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button className=" w-5 h-5 uppercase p-1 flex items-center border  border-red-500  max-w-max shadow-lg rounded-full">
                    <svg width="14" height="14"></svg>
                  </button>
                </div>
              )}
            </td>
            <tr className="flex justify-center">
              <button
                onClick={() => {
                  clickRelayButton(relay, key);
                }}
                className="flex items-center"
              >
                click
              </button>
            </tr>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Relay;
