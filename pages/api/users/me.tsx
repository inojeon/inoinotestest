import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  session: string;
};

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log("me api");
  const profile = "aaaa";
  res.json({
    ok: true,
    profile,
  });
  // console.log("me");
  // res.status(200).json({ session: "12345" });
}
