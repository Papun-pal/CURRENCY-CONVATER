const dropList =document.querySelectorAll(".drop-list select"),
formCurrency = document.querySelector(".form select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button"),
exchangeIcon = document.querySelector(".drop-list .icon");
// console.log(formCurrency);
// console.log(toCurrency);

for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code){
        let selected;
        if(i==0){
            selected = currency_code =="USD" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code =="INR" ? "selected" : "";
        }

        let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }
    dropList[i].addEventListener("change",e =>{
        loadFlag(e.target);
    })
    
}
function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
        }
    }
}

window.addEventListener("load",  ()=>{
    getExchangeRate();

});
getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();

});
exchangeIcon.addEventListener("click",()=>{
    let temp = formCurrency.value;
    formCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    loadFlag(formCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate(){
    const amount =document.querySelector(".amount input"),
    exchangerateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    // console.log(amount);
    // console.log(amountVal);

    if(amountVal == "" || amountVal == "0"){
        // console.log("work");
        amount.value ="1";
        amountVal = 1;
        
    }
    exchangerateTxt.innerHTML = "Gatting exchange rate......";

    let url = ` https://v6.exchangerate-api.com/v6/26d5f57373af1dadd4baf2a7/latest/${formCurrency.value}`;
    fetch(url).then(response => (response.json())).then(result =>{
        let exchangerate = result.conversion_rates[toCurrency.value];
        let totalExchangerate =(exchangerate*amountVal).toFixed(3);
        exchangerateTxt.innerHTML = `${amountVal} ${formCurrency.value} = ${totalExchangerate} ${toCurrency.value}`

        console.log(totalExchangerate)
    }).catch(() =>{
        exchangerateTxt.innerHTML = "Something went wrong";
    })

}