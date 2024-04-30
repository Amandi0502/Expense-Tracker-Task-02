const currencyHolder = document.getElementById("currency")

const balanceHolder = document.getElementById("balance")


const ABCNameHolder = document.getElementById("name")
const ABCAmountHolder = document.getElementById("amount")


const income = document.getElementById("income")
const expense = document.getElementById("expense")

const saveButton = document.getElementById("Save");

const cancelButton = document.getElementById("cancel");

const displayList= document.getElementById("List_of_transactions");

let symbol = "$";
let ListofTransactions=[];
let currentBalance = 0;

let editIndex = -1;



function edit (i){
    cancelButton.style.display = "block";

    editIndex = i;
    ABCNameHolder.value =  ListofTransactions[i].name;
    ABCAmountHolder.value =  ListofTransactions[i].amount;
    if(ListofTransactions[i].type == "income"){
        income.checked = true
    }
    else{
        expense.checked = true;
    }
}

function del(i){
    ListofTransactions = ListofTransactions.filter((e,index) => i !== index );
    render();
}

function SaveData(){
    localStorage.setItem("symbol",symbol);
    localStorage.setItem("balance",currentBalance);
    localStorage.setItem("list",JSON.stringify(ListofTransactions));

}

function loadData() {
    symbol = localStorage.getItem("symbol") ;;
    ListofTransactions=JSON.parse(localStorage.getItem("list"));;
    currentBalance = Number(localStorage.getItem("balance"));;
}


function render(){
    currentBalance = ListofTransactions.reduce((total,value)=>{
        return value.type == "expense" ? total-value.amount:total+value.amount},0)

    
    displayList.innerHTML = "";

    if(ListofTransactions.length == 0){
        displayList.innerHTML += "No Transactions found!"
    }
    
    else{
        ListofTransactions.forEach((e,i) => {
            displayList.innerHTML += 
                <li class="transaction ${e.type}">
                    <p>${e.name}</p>
                    <div class="right_side">
                        <p>${symbol}${e.value}</p>
                        <button onclick="edit(${i})"><i class="fas fa-edit"></i></button>
                        <button onclick="del(${i})"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </li>
            ;
        })
    }
    
    currencyHolder.innerHTML = symbol;
    balanceHolder.innerHTML = currentBalance;
    SaveData();

}

cancelButton.addEventListener("click",() => {
    editIndex = -1;
    ABCNameHolder.value = "";
    ABCAmountHolder.value = "";
    cancelButton.style.display = "none";
} )
saveButton.addEventListener("click",() => {
    if(ABCNameHolder.value == "" || Number
    (ABCAmountHolder.value) >= 0 ){
        alert("can't do that!");
        return;
    }
    
    let Transactions = {
        name: ABCNameHolder .value,
        amount: Number(ABCAmountHolder .value),
        type:income.checked? "income": "expense"

    };

    if(editIndex == -1)
    ListofTransactions.push(transaction);

    else
        ListofTransactions[editIndex] = transaction;
    
    editIndex = -1;
    ABCNameHolder.value = "";
    ABCAmountHolder.value = "";
    render();
    cancelButton.style.display = "none";
})

loadData();

render();
