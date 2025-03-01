import express from "express";
import client from "../config/client.js";
import BloomFilter from "../utils/bloom-filters.js";
const router = express.Router();
const bloomFilter = new BloomFilter(9586, 7);

router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const bitArray =
    JSON.parse(await client.get("bloomFilter")) || bloomFilter.bitArray;

  bloomFilter.bitArray = bitArray;
  const exists = bloomFilter.check(email);

  const redisData = await client.get("bloomFilter");
  //console.log("Stored Bloom Filter in Redis:", JSON.parse(redisData)?.length);

  return res.status(200).json({ exists });
});

// Endpoint to add an email to the Bloom Filter
router.post("/add-email", async (req, res) => {
  const { email } = req.body;
  const bitArray =
    JSON.parse(await client.get("bloomFilter")) || bloomFilter.bitArray;

  bloomFilter.bitArray = bitArray;
  bloomFilter.add(email);

  await client.set("bloomFilter", JSON.stringify(bloomFilter.bitArray));
  return res.status(200).json({ message: "Email added to Bloom Filter" });
});

export default router;
