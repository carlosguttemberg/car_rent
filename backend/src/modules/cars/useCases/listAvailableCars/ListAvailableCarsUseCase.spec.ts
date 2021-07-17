import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fiat Uno",
      description: "Uno com escada",
      daily_rate: 40,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Fiat escada",
      category_id: "3cb67409-2e1f-4100-847e-f8c3a351e4bf",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Fiat escada",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fiat Uno com escada",
      description: "Uno com escada",
      daily_rate: 40,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Fiat escada",
      category_id: "3cb67409-2e1f-4100-847e-f8c3a351e4bf",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Fiat Uno com escada",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fiat Uno com escada",
      description: "Uno com escada",
      daily_rate: 40,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Fiat escada",
      category_id: "123456",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "123456",
    });

    expect(cars).toEqual([car]);
  });
});
