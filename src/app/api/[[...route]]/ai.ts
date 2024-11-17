import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

const app = new Hono().post(
  "/generate-image",
  zValidator(
    "json",
    z.object({
      prompt: z.string(),
    })
  ),
  async (c) => {
    const { prompt } = c.req.valid("json");

    try {
      const input = {
        cfg: 3.5,
        steps: 28,
        prompt,
        aspect_ratio: "3:2",
        output_format: "webp",
        output_quality: 90,
        negative_prompt: "",
        prompt_strength: 0.85,
      };

      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: "72c05df2daf615fb5cc07c28b662a2a58feb6a4d0a652e67e5a9959d914a9ed2",
          input: input,
        }),
      });

      const prediction = await response.json();

      const getResult = async () => {
        const resultResponse = await fetch(prediction.urls.get, {
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          },
        });
        return await resultResponse.json();
      };

      let result;
      while (true) {
        result = await getResult();
        if (result.status === "succeeded") {
          return c.json({ data: result.output[0] });
        }
        if (result.status === "failed") {
          throw new Error("Image generation failed");
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error("Error:", error);
      return c.json({ error: "Failed to generate image" }, 500);
    }
  }
);

export default app;
