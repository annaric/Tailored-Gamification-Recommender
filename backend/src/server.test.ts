import request from "supertest";
import app from "./server"; // Adjust the path to your Express app

describe("API Endpoints", () => {
  it("should return a recommendation", async () => {
    const response = await request(app)
      .post("/recommendation")
      .send({ gender: "male" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("recommendation");
  });
});
