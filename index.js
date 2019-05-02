class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    //this.balance = 0;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let b = 0;
    this.transactions.forEach(element => { b += element.value; });
    return b;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

//-------------------------------------------------------
class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  // Update the balance in the account
  commit() {
    this.time = new Date();
    if(this.isAllowed()){
      this.account.addTransaction(this);
      return true
    }
    return false;
  }
  isAllowed(){
    return (this.account.balance + this.value >= 0);
  }

}
//-------------------------------------------------------
class Deposit extends Transaction{

  get value(){
    return this.amount;
  }

}

class Withdrawal extends Transaction{

 get value(){
    return -this.amount;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
