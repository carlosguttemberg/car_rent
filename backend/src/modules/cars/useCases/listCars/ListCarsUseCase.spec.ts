import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fiat Uno",
      description: "Uno sem escada",
      daily_rate: 40,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Fiat",
      category_id: "3cb67409-2e1f-4100-847e-f8c3a351e4bf",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fiat Uno",
      description: "Uno com escada",
      daily_rate: 40,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Fiat escada",
      category_id: "3cb67409-2e1f-4100-847e-f8c3a351e4bf",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Fiat escada",
    });

    console.log(cars);

    expect(cars).toEqual([car]);
  });
});
