let category_button = document.querySelectorAll(".category-btn");
let preview_div = document.querySelector(".preview-div");
let category_div = document.querySelector(".category-div");
let close_button = document.querySelector(".close-btn");
let convert_div = document.querySelector(".convert-div");
let preview_span = document.querySelector(".preview-span");
let input_box = document.getElementById("input-box");
let output_box = document.getElementById("output-box");
let from_unit_box = document.getElementById("from-unit");
let to_unit_box = document.getElementById("to-unit");
let selected_category;
let input_value;

let conversion_data = {

    Length: {

        Kilometer: {
            Kilometer: 1,
            Meter: 1000,
            Centimeter: 100000,
            Millimeter: 1000000,
            Inch: 39370.1,
            Foot: 3280.84,
            Yard: 1093.61,
            Mile: 0.621371,
        },

        Meter: {
            Kilometer: 0.001,
            Meter: 1,
            Centimeter: 100,
            Millimeter: 1000,
            Inch: 39.3701,
            Foot: 3.28084,
            Yard: 1.09361,
            Mile: 0.000621371,
        },

        Centimeter: {
            Kilometer: 0.00001,
            Meter: 0.01,
            Centimeter: 1,
            Millimeter: 10,
            Inch: 0.393701,
            Foot: 0.0328084,
            Yard: 0.0109361,
            Mile: 0.0000062137,
        },

        Millimeter: {
            Kilometer: 0.000001,
            Meter: 0.001,
            Centimeter: 0.1,
            Millimeter: 1,
            Inch: 0.0393701,
            Foot: 0.00328084,
            Yard: 0.00109361,
            Mile: 0.000000621371,
        },

        Inch: {
            Kilometer: 0.0000254,
            Meter: 0.0254,
            Centimeter: 2.54,
            Millimeter: 25.4,
            Inch: 1,
            Foot: 0.0833333,
            Yard: 0.0277778,
            Mile: 0.0000157828,
        },

        Foot: {
            Kilometer: 0.0003048,
            Meter: 0.3048,
            Centimeter: 30.48,
            Millimeter: 304.8,
            Inch: 12,
            Foot: 1,
            Yard: 0.333333,
            Mile: 0.000189394,
        },

        Yard: {
            Kilometer: 0.0009144,
            Meter: 0.9144,
            Centimeter: 91.44,
            Millimeter: 914.4,
            Inch: 36,
            Foot: 3,
            Yard: 1,
            Mile: 0.000568182,
        },

        Mile: {
            Kilometer: 1.60934,
            Meter: 1609.34,
            Centimeter: 160934,
            Millimeter: 1609340,
            Inch: 63360,
            Foot: 5280,
            Yard: 1760,
            Mile: 1,
        }


    },

    Mass: {
        Kilogram: {
            Kilogram: 1,
            Gram: 1000,
            Milligram: 1000000,
            Ton: 0.001,
            Pound: 2.20462,
            Ounce: 35.274,
        },

        Gram: {
            Kilogram: 0.001,
            Gram: 1,
            Milligram: 1000,
            Ton: 0.000001,
            Pound: 0.00220462,
            Ounce: 0.035274,
        },

        Milligram: {
            Kilogram: 0.000001,
            Gram: 0.001,
            Milligram: 1,
            Ton: 1e-9,
            Pound: 2.2046e-6,
            Ounce: 3.5274e-5,
        },

        Ton: {
            Kilogram: 1000,
            Gram: 1000000,
            Milligram: 1000000000,
            Ton: 1,
            Pound: 2204.62,
            Ounce: 35274,
        },

        Pound: {
            Kilogram: 0.453592,
            Gram: 453.592,
            Milligram: 453592,
            Ton: 0.000453592,
            Pound: 1,
            Ounce: 16,
        },

        Ounce: {
            Kilogram: 0.0283495,
            Gram: 28.3495,
            Milligram: 28349.5,
            Ton: 2.83495e-5,
            Pound: 0.0625,
            Ounce: 1,
        }
    },

    Time: {
        Millisecond: {
            Millisecond: 1,
            Second: 0.001,
            Minute: 1e-5,
            Hour: 2.77778e-7,
            Day: 1.15741e-8,
            Week: 1.65342e-9,
            Month: 3.80517e-10,
            Year: 3.17098e-11,
            Decade: 3.17098e-12,
            Century: 3.17098e-13,
            Millennium: 3.17098e-14,
        },

        Second: {
            Millisecond: 1000,
            Second: 1,
            Minute: 0.0166667,
            Hour: 0.000277778,
            Day: 1.15741e-5,
            Week: 1.65342e-6,
            Month: 3.80517e-7,
            Year: 3.17098e-8,
            Decade: 3.17098e-9,
            Century: 3.17098e-10,
            Millennium: 3.17098e-11,
        },

        Minute: {
            Millisecond: 60000,
            Second: 60,
            Minute: 1,
            Hour: 0.0166667,
            Day: 6.94444e-4,
            Week: 9.92063e-5,
            Month: 2.26757e-5,
            Year: 1.88964e-6,
            Decade: 1.88964e-7,
            Century: 1.88964e-8,
            Millennium: 1.88964e-9,
        },

        Hour: {
            Millisecond: 3600000,
            Second: 3600,
            Minute: 60,
            Hour: 1,
            Day: 0.0416667,
            Week: 0.00595238,
            Month: 0.00138889,
            Year: 0.000114155,
            Decade: 1.14155e-5,
            Century: 1.14155e-6,
            Millennium: 1.14155e-7,
        },

        Day: {
            Millisecond: 86400000,
            Second: 86400,
            Minute: 1440,
            Hour: 24,
            Day: 1,
            Week: 0.142857,
            Month: 0.0328767,
            Year: 0.00273973,
            Decade: 2.73973e-4,
            Century: 2.73973e-5,
            Millennium: 2.73973e-6,
        },

        Week: {
            Millisecond: 604800000,
            Second: 604800,
            Minute: 10080,
            Hour: 168,
            Day: 7,
            Week: 1,
            Month: 0.230137,
            Year: 0.0191781,
            Decade: 0.00191781,
            Century: 0.000191781,
            Millennium: 1.91781e-5,
        },

        Month: {
            Millisecond: 2628000000,
            Second: 2628000,
            Minute: 43800,
            Hour: 730,
            Day: 30,
            Week: 4.34524,
            Month: 1,
            Year: 0.0833333,
            Decade: 0.00833333,
            Century: 0.000833333,
            Millennium: 8.33333e-5,
        },

        Year: {
            Millisecond: 31536000000,
            Second: 31536000,
            Minute: 525600,
            Hour: 8760,
            Day: 365,
            Week: 52.1775,
            Month: 12,
            Year: 1,
            Decade: 0.1,
            Century: 0.01,
            Millennium: 0.001,
        },

        Decade: {
            Millisecond: 315360000000,
            Second: 315360000,
            Minute: 5256000,
            Hour: 87600,
            Day: 3650,
            Week: 521.775,
            Month: 120,
            Year: 10,
            Decade: 1,
            Century: 0.1,
            Millennium: 0.01,
        },

        Century: {
            Millisecond: 3153600000000,
            Second: 3153600000,
            Minute: 52560000,
            Hour: 876000,
            Day: 36500,
            Week: 5217.75,
            Month: 1200,
            Year: 100,
            Decade: 10,
            Century: 1,
            Millennium: 0.1,
        },

        Millennium: {
            Millisecond: 31536000000000,
            Second: 31536000000,
            Minute: 525600000,
            Hour: 8760000,
            Day: 365000,
            Week: 52177.5,
            Month: 12000,
            Year: 1000,
            Decade: 100,
            Century: 10,
            Millennium: 1,
        }
    },

    Temperature: {
        Kelvin: {
            Kelvin: (x) => x,
            Celcius: (x) => x - 273.15,
            Fahrenheit: (x) => (x - 273.15) * 9 / 5 + 32,
        },

        Celcius: {
            Kelvin: (x) => x + 273.15,
            Celcius: (x) => x,
            Fahrenheit: (x) => (x * 9 / 5) + 32,
        },

        Fahrenheit: {
            Kelvin: (x) => (x - 32) * 5 / 9 + 273.15,
            Celcius: (x) => (x - 32) * 5 / 9,
            Fahrenheit: (x) => x,
        }
    },

    Angle: {
        Degree: {
            Degree: 1,
            Radian: Math.PI / 180,
            Gradian: 10 / 9
        },

        Radian: {
            Degree: 180 / Math.PI,
            Radian: 1,
            Gradian: 200 / Math.PI
        },

        Gradian: {
            Degree: 9 / 10,
            Radian: Math.PI / 200,
            Gradian: 1
        }
    },

    Speed: {
        mps: {
            mps: 1,
            kmh: 3.6,
            mph: 2.23694,
            fts: 3.28084,
            Knots: 1.94384
        },
        kmh: {
            mps: 0.277778,
            kmh: 1,
            mph: 0.621371,
            fts: 0.911344,
            Knots: 0.539957
        },
        mph: {
            mps: 0.44704,
            kmh: 1.60934,
            mph: 1,
            fts: 1.46667,
            Knots: 0.868976
        },
        fts: {
            mps: 0.3048,
            kmh: 1.09728,
            mph: 0.681818,
            fts: 1,
            Knots: 0.592484
        },
        Knots: {
            mps: 0.514444,
            kmh: 1.85185,
            mph: 1.15078,
            fts: 1.68781,
            Knots: 1
        }
    },

    Area: {
        "m²": {
            "m²": 1,
            "km²": 1e-6,
            "mi²": 3.861e-7,
            "ft²": 10.7639,
            "in²": 1550.0031,
            "yd²": 1.19599,
            "Hectare": 1e-4
        },
        "km²": {
            "m²": 1e6,
            "km²": 1,
            "mi²": 3.861e-4,
            "ft²": 1.07639e7,
            "in²": 1.550003e9,
            "yd²": 1.19599e6,
            "Hectare": 100
        },
        "mi²": {
            "m²": 2.58999e6,
            "km²": 2.58999,
            "mi²": 1,
            "ft²": 27878400,
            "in²": 4.014226e6,
            "yd²": 3097600,
            "Hectare": 258.999
        },
        "ft²": {
            "m²": 0.092903,
            "km²": 9.2903e-8,
            "mi²": 3.587e-8,
            "ft²": 1,
            "in²": 144,
            "yd²": 0.111111,
            "Hectare": 9.2903e-6
        },
        "in²": {
            "m²": 0.00064516,
            "km²": 6.4516e-10,
            "mi²": 2.471e-10,
            "ft²": 0.00694444,
            "in²": 1,
            "yd²": 0.000771605,
            "Hectare": 6.4516e-8
        },
        "yd²": {
            "m²": 0.836127,
            "km²": 8.36127e-7,
            "mi²": 3.228e-7,
            "ft²": 9,
            "in²": 1296,
            "yd²": 1,
            "Hectare": 8.36127e-5
        },
        "Hectare": {
            "m²": 10000,
            "km²": 0.01,
            "mi²": 3.861e-5,
            "ft²": 107639.104,
            "in²": 1550000.16,
            "yd²": 1195.99,
            "Hectare": 1
        }
    },

    Pressure: {
        "Pascal": {
            "Pascal": 1,
            "Kilopascal": 0.001,
            "Bar": 1e-5,
            "Millibar": 10,
            "Atmosphere": 9.8692e-6,
            "psi": 0.000145038
        },
        "Kilopascal": {
            "Pascal": 1000,
            "Kilopascal": 1,
            "Bar": 0.01,
            "Millibar": 10000,
            "Atmosphere": 0.000986923,
            "psi": 0.145038
        },
        "Bar": {
            "Pascal": 100000,
            "Kilopascal": 100,
            "Bar": 1,
            "Millibar": 1000,
            "Atmosphere": 0.986923,
            "psi": 14.5038
        },
        "Millibar": {
            "Pascal": 100,
            "Kilopascal": 0.1,
            "Bar": 0.001,
            "Millibar": 1,
            "Atmosphere": 9.8692e-7,
            "psi": 0.0145038
        },
        "Atmosphere": {
            "Pascal": 101325,
            "Kilopascal": 101.325,
            "Bar": 1.01325,
            "Millibar": 1013.25,
            "Atmosphere": 1,
            "psi": 14.696
        },
        "psi": {
            "Pascal": 6894.76,
            "Kilopascal": 6.89476,
            "Bar": 0.0689476,
            "Millibar": 68.9476,
            "Atmosphere": 0.0680459,
            "psi": 1
        }
    },

    Data: {
        "Bit": {
            "Bit": 1,
            "Byte": 0.125,
            "Kilobyte": 1.25e-4,
            "Megabyte": 1.25e-7,
            "Gigabyte": 1.25e-10,
            "Terabyte": 1.25e-13
        },
        "Byte": {
            "Bit": 8,
            "Byte": 1,
            "Kilobyte": 0.001,
            "Megabyte": 1e-6,
            "Gigabyte": 1e-9,
            "Terabyte": 1e-12
        },
        "Kilobyte": {
            "Bit": 8000,
            "Byte": 1000,
            "Kilobyte": 1,
            "Megabyte": 0.001,
            "Gigabyte": 1e-6,
            "Terabyte": 1e-9
        },
        "Megabyte": {
            "Bit": 8000000,
            "Byte": 1000000,
            "Kilobyte": 1000,
            "Megabyte": 1,
            "Gigabyte": 0.001,
            "Terabyte": 1e-6
        },
        "Gigabyte": {
            "Bit": 8e9,
            "Byte": 1e9,
            "Kilobyte": 1e6,
            "Megabyte": 1000,
            "Gigabyte": 1,
            "Terabyte": 0.001
        },
        "Terabyte": {
            "Bit": 8e12,
            "Byte": 1e12,
            "Kilobyte": 1e9,
            "Megabyte": 1e6,
            "Gigabyte": 1000,
            "Terabyte": 1
        }
    }

};

function open_preview(btnText) {
    category_button.forEach((btn) => {
        btn.style.visibility = "hidden";
        btn.style.cursor = "default";
        btn.style.backgroundColor = "white";
    });
    category_div.style.boxShadow = "none";
    category_div.style.border = "none";
    preview_div.style.display = "block";
    close_button.style.display = "block";
    preview_span.textContent = btnText.toString();
    preview_span.style.display = "block";
    selected_category = btnText.split(" ")[0];
    unitOption();

}

function close_preview() {
    category_button.forEach((btn) => {
        btn.style.visibility = "visible";
        btn.style.cursor = "pointer";
        btn.style.backgroundColor = "cadetblue";
    });
    category_div.style.boxShadow = "0 0 10px gray";
    category_div.style.border = "2px solid silver";
    preview_div.style.display = "none";
    close_button.style.display = "none";
    preview_span.style.display = "none";
    from_unit_box.options.length = 0;
    to_unit_box.options.length = 0;
    input_box.value = "";
    output_box.value = "";
}

function unitOption() {

    let unit_data = {

        Length: ["Kilometer (km)", "Meter (m)", "Centimeter (cm)", "Millimeter (mm)", "Inch (in)", "Foot (ft)", "Yard (yd)", "Mile (mi)"],
        Mass: ["Kilogram (kg)", "Gram (g)", "Milligram (mg)", "Ton (t)", "Pound (Ib)", "Ounce (oz)"],
        Time: ["Millisecond (ms)", "Second (s)", "Minute (min)", "Hour (h)", "Day ", "Week ", "Month ", "Year ", "Decade ", "Century ", "Millennium "],
        Temperature: ["Kelvin (K)", "Celcius (°C)", "Fahrenheit (°F)"],
        Angle: ["Degree (°)", "Radian (rad)", "Gradian (gon)"],
        Speed: ["mps ", "kmh ", "mph ", "fts ", "Knots (kt)"],
        Area: ["m² ", "km² ", "mi² ", "ft² ", "in² ", "yd² ", "Hectare (ha)"],
        Pressure: ["Pascal (Pa)", "Kilopascal (kPa)", "Bar ", "Millibar ", "Atmosphere (atm)", "psi "],
        Data: ["Bit (b)", "Byte (B)", "Kilobyte (KB)", "Megabyte (MB)", "Gigabyte (GB)", "Terabyte (TB)"]

    };

    for (i = 0; i < unit_data[selected_category].length; i++) {
        from_unit_box.innerHTML += `<option>${unit_data[selected_category][i]}</option>`;
        to_unit_box.innerHTML += `<option>${unit_data[selected_category][i]}</option>`;
    }

}

input_box.addEventListener("input", function () {
    input_value = parseInt(input_box.value);
    const min = parseInt(input_box.min);
    if (input_value <= min) {
        input_box.value = "";
    }
    if (input_box.value === "") {
        output_box.value = "";
    } else {
        convert_value();
    }
});

from_unit_box.addEventListener("input", function () {
    if (input_box.value != "") {
        convert_value();
    }
});

to_unit_box.addEventListener("input", function () {
    if (input_box.value != "") {
        convert_value();
    }
});

function convert_value() {
    let from_unit = from_unit_box.value.split(" ")[0];
    let to_unit = to_unit_box.value.split(" ")[0];
    if (selected_category == "Temperature") {
        output_box.value = conversion_data[selected_category][from_unit][to_unit](input_value);
    } else {
        let conversion_value = conversion_data[selected_category][from_unit][to_unit];
        output_box.value = (input_value * conversion_value);
    }
    if (input_box.value === "") {
        output_box.value = "";
    }
}
