import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "123-456",
      fine_amount: 60,
      brand: "Brand car",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      description: "Description Car 1",
      daily_rate: 100,
      license_plate: "123-456",
      fine_amount: 60,
      brand: "Brand Car 1",
      category_id: "category",
    });

    expect(
      createCarUseCase.execute({
        name: "Car 2",
        description: "Description Car 2",
        daily_rate: 100,
        license_plate: "123-456",
        fine_amount: 60,
        brand: "Brand Car 2",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 1",
      description: "Description Car 1",
      daily_rate: 100,
      license_plate: "123-456",
      fine_amount: 60,
      brand: "Brand Car 1",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
