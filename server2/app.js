const express = require('express');
const cors = require('cors');
const schedule = require('node-schedule');
const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors());
// Array of finance accounts
let financeAccounts = [
  { name: 'MámaSpoř', value: 200_000, interest: 0.039583 },
  { name: 'JáSpoř', value: 30200, interest: 0.039583 },

];

// Function to add interest to accounts at the end of each month
function addInterest() {

  financeAccounts.forEach(account => {
    account.value += account.value * account.interest;
    console.log( account.value)
  });
}


function endOfMonthTask() {
  console.log("Executing task at the end of the month");
  // Your task logic here
}

// Schedule the task to run on the last day of every month at 23:59
const job = schedule.scheduleJob('59 23 L * *',  addInterest);
// const job2 = schedule.scheduleJob('* * * * * *', addInterest);
// API endpoint to retrieve account data
app.get('/accounts', (req, res) => {
  res.json(financeAccounts);
});



// API endpoint to set account data
app.post('/insert', (req, res) => {
  const { name, value } = req.body;
  const accountToUpdate = financeAccounts.find(account => account.name === name);

  if (accountToUpdate) {
    accountToUpdate.value += Number(value);
    res.json({ message: 'Account data updated successfully', financeAccounts });
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
});
// Schedule the addInterest function to run at the end of each month


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});