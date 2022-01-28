import axios from "axios";

type Prop = {
  relays: any[];
  ENDPOINT: string;
  device: string;
};

const Relay = ({ relays, ENDPOINT, device }: Prop) => {
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
        console.log(res);
      });
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
            <td className="flex justify-center">
              <div>
                <button
                  onClick={() => {
                    clickRelayButton(relay, key);
                  }}
                  className="flex items-center"
                >
                  click
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Relay;
