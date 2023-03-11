const { ethers } = require("ethers");
const contract_abi = require("./contract_abi.json");

const ABI = contract_abi.abi;
const network = {
  name: "maticmum",
  chainId: 80001,
};

const provider = new ethers.providers.AlchemyProvider(
  network,
  process.env.API_KEY
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const signer = wallet.connect(provider);
const my_contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  ABI,
  signer
);

module.exports = { wallet, signer, provider, my_contract };
