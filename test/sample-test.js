const { expect } = require("chai");
const { ethers } = require("hardhat");

//describe("Greeter", function () {
  //it("Should return the new greeting once it's changed", async function () {
    //const Greeter = await ethers.getContractFactory("Greeter");
    //const greeter = await Greeter.deploy("Hello, world!");
    //await greeter.deployed();

    //expect(await greeter.greet()).to.equal("Hello, world!");

    //const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    //// wait until the transaction is mined
    //await setGreetingTx.wait();

    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  //});
//});

describe("TODOLIST", function () {
  it("check if the todo list works", async function () {
    const Greeter = await ethers.getContractFactory("ContractToDoList");
    const greeter = await Greeter.deploy();
    await greeter.deployed();

    //expect(await greeter.greet()).to.equal("Hello, world!");

    const create_task = await greeter.addTask("Clean the dishes");

    // wait until the transaction is mined
    await create_task.wait();

    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});