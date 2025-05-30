import eurosFormatter from './euroFormatter.js';

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: 40,
    _dailyTotalWithdrawals: 0,

    resetDailyAllowance: function () {
      this._dailyTotalWithdrawals = 0;
    },

    setDailyAllowance: function (newAmount) {
      this._dailyAllowance = newAmount;
    },

    deposit: function (amount) {
      this._cash += amount;
    },

    withdraw: function (amount) {
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
    },

    transferInto: function (wallet, amount) {
      console.log(
        `Transferring ${eurosFormatter.format(amount)} from ${
          this._name
        } to ${wallet.getName()}`
      );
      const withdrawnAmount = this.withdraw(amount);
      wallet.deposit(withdrawnAmount);
    },

    reportBalance: function () {
      console.log(
        `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
      );
    },

    getName: function () {
      return this._name;
    },
  };
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