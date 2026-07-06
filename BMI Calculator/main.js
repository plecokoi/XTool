let heightInput = document.getElementById("heightInput");
let weightInput = document.getElementById("weightInput");
let bmiText = document.getElementById("bmiText");
let bmiCategory = document.getElementById("bmiCategory");
const bmiDefault = "";
let bmiLevel = "";
let outputDiv = document.querySelector(".output-div");

heightInput.addEventListener("input", function () {
    let heightValue = parseFloat(heightInput.value);
    const minHeight = parseFloat(heightInput.min);
    if (heightValue <= minHeight) {
        heightInput.value = "";
    }
    if (heightValue === "") {
        bmiText.textContent = bmiDefault;
    }
    else {
        calculateValue();
    }
});

weightInput.addEventListener("input", function () {
    let weightValue = parseFloat(weightInput.value);
    if (weightValue === "") {
        bmiText.textContent = bmiDefault;
    }
    else {
        calculateValue();
    }
});

function calculateValue() {
    let heightValue = parseFloat(heightInput.value);
    let weightValue = parseFloat(weightInput.value);

    if (heightInput.value !== "" && weightInput.value !== "") {
        let bmiValue = (weightValue / (heightValue ** 2));
        bmiText.innerHTML = bmiValue.toFixed(2).toString() + "<br>";
        bmiCategory.textContent = getBMICategory(bmiValue);
        outputDiv.style.marginTop = "20px";

    } else {
        bmiText.textContent = bmiDefault;
        bmiCategory.textContent = bmiDefault;
        outputDiv.style.marginTop = "0px";
    }

}

function getBMICategory(bmiValue) {

    switch (true) {

        case (bmiValue < 18.5):
            bmiLevel = "Underweight";
            break;

        case (bmiValue >= 18.5 && bmiValue <= 24.9):
            bmiLevel = "Normal";
            break;

        case (bmiValue >= 25 && bmiValue <= 29.9):
            bmiLevel = "Overweight";
            break;

        case (bmiValue >= 30 && bmiValue <= 34.9):
            bmiLevel = "Obesity Class I";
            break;

        case (bmiValue >= 35 && bmiValue <= 39.9):
            bmiLevel = "Obesity Class II";
            break;

        case (bmiValue >= 40):
            bmiLevel = "Obesity Class III";
            break;

    }

    return bmiLevel.toString();

}