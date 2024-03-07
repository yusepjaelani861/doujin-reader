// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    message: string;
    image: string | null;
  }>
) {
  if (req.method === "POST") {
    // Process a POST request
    try {
      const url = req.body.url;

      const agent = new https.Agent({
        rejectUnauthorized: false,
      });

      // blob image json
      const response = await fetch(url);
      const blob = await response.blob();

      const buffer = await blob.arrayBuffer();
      const bufferArray = new Uint8Array(buffer);
      const base64 = Buffer.from(bufferArray).toString("base64");

      res.status(200).json({
        message: "Success getting data",
        image: `data:${response.headers.get("content-type")};base64,${base64}`,
      });
    } catch (error) {
      res.status(200).json({ message: "Success", image: req.body.url });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Method Not Allowed", image: null });
  }
}
