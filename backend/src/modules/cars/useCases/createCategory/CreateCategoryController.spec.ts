import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("Create Category Controller", () => {
  it("should be able to crate a new category", async () => {
    const response = await request(app).post("/categories").send({
      name: "Test Category",
      description: "Test Category",
    });

    expect(response.status).toBe(201);
  });
});
