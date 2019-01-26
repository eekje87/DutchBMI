/*
* This is a simple BMI calculator APP written in vanilla JS by Sunny Karpuzov
 */

hideCards();

document.getElementById('berekenenBtn').addEventListener('click', initiateBmiCalculator);
document.getElementById('toggleDisclaimer').addEventListener('click', toggleDisclaimer);

//initiateBmiCalculator pulls the entered values, checks for negatives or undefined values and proceeds
function initiateBmiCalculator() {

    //switch loading animation ON
    setLoader();

    //hideCards each time the function gets called to avoid card stacking on the DOM
    hideCards();

    //collect the values from the input
    let kilos = document.getElementById('kgInput').value;
    let centimers = document.getElementById('cmInput').value;

    //filter negative and undefined entries
    if (kilos.length == 0 || kilos <= 0 || centimers.length == 0 || centimers <= 0) {
        return false;
    } else {
        showLoading(kilos, centimers);
    }
}

//hideCards sets the visibility of the info cards in the DOM as hidden
function hideCards() {
    document.getElementById('cardContent').style.visibility = 'hidden';
    document.getElementById('card').className = 'card bg-dark mb-3';
    resetInnerContent();
}


//shows the BMI calculation result on a 3sec timer in order to properly show the loading animation
var myVar;
function showLoading(kilos, centimeters) {
    myVar = setTimeout(function () {
        calculateBmi(kilos, centimeters);
    }, 3000);
}


//this function calculates the BMI and the KG-to-POUNDS then shows it in the bootstrap card(s)
function calculateBmi(kilos, centimeters) {
    try {
        //PREPARE
        let bmi = kilos / ((centimeters / 100.0) * (centimeters / 100.0));
        document.getElementById('poundsOutput').innerHTML = (kilos * 2.20462262).toFixed(0) + " lbs";
        document.getElementById('bmiOutput').innerHTML = bmi.toFixed(2);

        if (bmi <= 18.5) {
            document.getElementById('card').className = 'card text-white bg-secondary mb-3';
            document.getElementById('result').innerHTML = "Ondergewicht";
        } else if (bmi <= 25) {
            document.getElementById('card').className = 'card text-white bg-success mb-3';
            document.getElementById('result').innerHTML = "Gezond gewicht";

        } else if (bmi <= 30) {
            document.getElementById('card').className = 'card text-white bg-warning mb-3';
            document.getElementById('result').innerHTML = "Overgewicht";

        } else if (bmi <= 40) {
            document.getElementById('card').className = 'card text-white bg-danger mb-3';
            document.getElementById('result').innerHTML = "Obesitas";

        } else {
            document.getElementById('card').className = 'card text-white bg-danger mb-3';
            document.getElementById('result').innerHTML = "Morbide Obesitas";
        }
        removeLoader();
        document.getElementById('cardContent').style.visibility = 'visible';

    } catch (err) {
        console.log(err); //logging errors
    }
}

//create & enable the loading animation
function setLoader() {
    var cheese = document.getElementById('card');
    var newElement = document.createElement("div");
    newElement.className='loader';
    newElement.id='spinner';
    cheese.appendChild(newElement);
}

//remove the loading animation
function removeLoader() {
    var item = document.getElementById('spinner');
    item.remove();
}

//reset all calculated values
function resetInnerContent() {
    document.getElementById('result').innerHTML = "";
    document.getElementById('poundsOutput').innerHTML = "";
    document.getElementById('bmiOutput').innerHTML = "";
}

function toggleDisclaimer() {
    alert("Niet voor jou");
}