const { expect } = require("chai");

describe("DecentralisedBank", async () => {
  let decentralisedBank;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const contractName = "DecentralisedBank";
    decentralisedBank = await ethers.deployContract(contractName, []);

    await decentralisedBank.waitForDeployment();

    console.log(`DecentralisedBank deployed at ${decentralisedBank.target}`);
  });

  it("should create an account", async () => {
    await decentralisedBank.connect(addr1).CreateAccount();
    const accExist = await decentralisedBank.accountExists(addr1.address);
    expect(accExist).to.equal(true);
  });

  it("should deposit funds", async () => {
    const depositAmount = ethers.parseEther("1");
    await decentralisedBank.connect(addr1).CreateAccount();
    await decentralisedBank.connect(addr1).Deposit({ value: depositAmount });
    const account = await decentralisedBank.accounts(addr1.address);
    expect(account.balance).to.equal(depositAmount);
  });

  it("should withdraw from an account", async () => {
    const depositAmount = ethers.parseEther("1");
    const withdrawAmount = ethers.parseEther("0.5"); // Adjust the withdraw amount as needed

    // Create an account and deposit funds
    await decentralisedBank.connect(addr1).CreateAccount();
    await decentralisedBank.connect(addr1).Deposit({ value: depositAmount });

    // Perform the withdrawal
    await decentralisedBank.connect(addr1).withdraw(withdrawAmount);

    // Check the updated account balance
    const account = await decentralisedBank.accounts(addr1.address);
    expect(account.balance).to.equal(withdrawAmount);
  });

  it("should transfer", async () => {
    const depositeAmount = ethers.parseEther("1");
    const transferAmount = ethers.parseEther("0.5");
    await decentralisedBank.connect(addr1).CreateAccount();
    await decentralisedBank.connect(addr1).Deposit({ value: depositeAmount });

    await decentralisedBank
      .connect(addr1)
      .transfer(addr2.address, transferAmount);
    const account1 = await decentralisedBank.accounts(addr1.address);
    const account2 = await decentralisedBank.accounts(addr2.address);

    expect(account1.balance).to.equal(transferAmount);
    expect(account2.balance).to.equal(transferAmount);
  });
});
