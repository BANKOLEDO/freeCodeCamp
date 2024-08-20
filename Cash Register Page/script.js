let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];


const currencyUnits = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
];

const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');

purchaseBtn.addEventListener('click', function() {
    const cash = parseFloat(cashInput.value);

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (cash === price) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        return;
    }

    changeDue.textContent = calculateChange(price, cash, cid);
});

function calculateChange(price, cash, cid) {
    let changeDue = cash - price;
    let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0);
    
    if (changeDue < 0) {
        return "Customer does not have enough money to purchase the item";
    }
    
    if (changeDue === 0) {
        return "No change due - customer paid with exact cash";
    }
    
    if (totalCid < changeDue) {
        return "Status: INSUFFICIENT_FUNDS";
    }
    
    if (totalCid === changeDue) {
        let result = "Status: CLOSED ";
        cid.forEach(([unit, amount]) => {
            if (amount > 0) {
                result += `${unit}: $${amount.toFixed(2)} `;
            }
        });
        return result.trim();
    }
    
    let changeArray = [];
    for (let [unit, value] of currencyUnits) {
        let amount = 0;
        while (changeDue >= value && cid.find(([name]) => name === unit)[1] > 0) {
            changeDue -= value;
            changeDue = Math.round(changeDue * 100) / 100; // Avoid floating point issues
            cid.find(([name]) => name === unit)[1] -= value;
            amount += value;
        }
        if (amount > 0) {
            changeArray.push([unit, amount]);
        }
    }
    
    if (changeDue > 0) {
        return "Status: INSUFFICIENT_FUNDS";
    }
    
    let result = "Status: OPEN ";
    changeArray.forEach(([unit, amount]) => {
        result += `${unit}: $${amount.toFixed(2)} `;
    });
    
    return result.trim();
}