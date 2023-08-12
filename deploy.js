const { ethers } = require("hardhat");

async function main() {
  const contractName = "DecentralisedBank";
  const contract = await ethers.deployContract(contractName, []);

  await contract.waitForDeployment();

  console.log(`DecentralisedBank deployed at ${contract.target}`);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
