// // Retrieve account data
function getAccountData() {
  console.log('getting account data')
  fetch("https://teesting-srver.onrender.com/accounts")
    .then((response) => response.json())
    .then((data) => {
      console.log("Account data:", data);
      let total = 0
      data.forEach((account) => {
        const element = document.querySelector(`[name="${account.name}"]`);
        if (element) {
          element.innerHTML = account.value + " CZK";
          total += account.value
        }
      });
      displayExpecetedEarnings(total/100*(4.75/12/2))
    })
    .catch((error) => {
      console.error("Error retrieving account data:", error);
    });
}

  function changeAccountValue(account, balanceChange) {
    console.log(account, balanceChange)
  fetch("https://teesting-srver.onrender.com/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: account, value: balanceChange }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Account data updated successfully", data);
      getAccountData()
    })
    .catch((error) => {
      console.error("Error updating account data:", error);
    });
}

function transferMoney(fromAccount, toAccount, money) {
  changeAccountValue(fromAccount, -money)
    .then(() => changeAccountValue(toAccount, money))
    .then(() => {
      // Add logic to transfer money between accounts
    })
    .catch((error) => {
      console.error("Error transferring money:", error);
    });
}
function displayNextInterestTimeRemaining() {
  const currentDate = new Date();
  const nextMonth = currentDate.getMonth() + 1;
  const nextYear = currentDate.getFullYear();

  // Set the date to the first of the next month
  const nextInterestDate = new Date(nextYear, nextMonth, 1);

  // Calculate the time remaining in milliseconds
  const timeRemaining = nextInterestDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days, hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Get the element with id "nextInterest"
  const nextInterestElement = document.getElementById("nextInterest");

  // Set the innerHTML of the element to the formatted time remaining
  nextInterestElement.innerHTML = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

function displayExpecetedEarnings(earnings){
  const futureEarningsDisplay = document.getElementById('expected-earnings')
  futureEarningsDisplay.innerHTML  = earnings
}

setInterval(displayNextInterestTimeRemaining, 1000);
getAccountData();
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('updateMamaAccount').addEventListener('click', () => {
      changeAccountValue('MámaSpoř', document.getElementById('mamaInput').value);
  });

  document.getElementById('updateJaAccount').addEventListener('click', () => {
      changeAccountValue('JáSpoř', document.getElementById('jaInput').value);
  });
});