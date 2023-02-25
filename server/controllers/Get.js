const { wallet, my_contract } = require("../wallet");

const connect = my_contract.connect(wallet);

async function Owner_Report(id, owner) {
  try {
    const response = await connect.getFileForOwner(id, owner);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

async function Buyer_Report(id, owner) {
  try {
    const response = await connect.getFileForBuyer(id, owner);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  Owner_Report,
  Buyer_Report,
};
