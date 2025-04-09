import request from "supertest";
import app from "../src/server"; // Adjust the path to your Express app

describe("API Endpoints", () => {
  it("should return a recommendation with all properties needed in the frontend", async () => {
    const response = await request(app)
      .post("/recommendation")
      .send({ gender: "male" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("recommendation");
    expect(response.body.recommendation).toHaveProperty("elements");
    expect(response.body.recommendation.elements[0]).toHaveProperty("details");
    expect(response.body.recommendation.elements[0]).toHaveProperty("elementName");
    expect(response.body.recommendation.elements[0]).toHaveProperty("imageSrc");
    expect(response.body.recommendation.elements[0]).toHaveProperty("scores");
    expect(response.body.recommendation.elements[0]).toHaveProperty("standardDeviations");
    expect(response.body.recommendation.elements[0].scores).toHaveProperty("overallScore");
    expect(response.body.recommendation.elements[0].standardDeviations).toHaveProperty("overallStandardDeviation");
  });

  it("should return a 400 error if input parameter is missing or empty", async () => {
    const response = await request(app).post("/recommendation").send({});

    expect(response.status).toBe(400);
    expect(response.text).toBe("Input parameter is required");
  });
});
