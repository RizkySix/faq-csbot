// pages/api/faq.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const { question, answer } = req.body;

    const existing = await prisma.fAQ.findFirst({
      where: { question: question.trim() },
    });

    if (existing) {
      return res.status(409).json({ message: "Question duplicate!" });
    }

    const newFAQ = await prisma.fAQ.create({
      data: { question, answer, downloaded: false },
    });

    res.status(200).json(newFAQ);
  } catch (error) {
    console.error("❌ API Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
