import eurosFormatter from './euroFormatter.js';

function deposit(amount) {
  this._cash += amount;
}

function withdraw(amount) {
  if (this._cash - amount < 0) {
    console.log(`Insufficient funds!`);
    return 0;
  } else if (this._dailyTotalWithdrawals + amount > this._dailyAllowance) {
    console.log(`Exceeded daily withdrawal limit!`);
    return 0;
  } else {
    this._cash -= amount;
    this._dailyTotalWithdrawals += amount;
    return amount;
  }
}
function resetDailyAllowance() {
  this._dailyTotalWithdrawals = 0;
}

function setDailyAllowance(newAmount) {
  this._dailyAllowance = newAmount;
}

function transferInto(wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${
      this._name
    } to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
}

function reportBalance() {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
}

function getName() {
  return this._name;
}
const walletPrototype = {
  deposit,
  withdraw,
  transferInto,
  reportBalance,
  getName,
  resetDailyAllowance,
  setDailyAllowance
}

function createWallet(name, cash = 0) {
  const wallet = Object.create(walletPrototype);
  wallet._name = name;
  wallet._cash = cash;
  wallet._dailyAllowance = 40;
  wallet._dailyTotalWithdrawals = 0;
  return wallet;
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();