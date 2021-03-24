let inpt, outpt;
let bgArr = ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ь", "ю", "я"];
let enArr = ["a", "b", "v", "g", "d", "e", "zh", "z", "i", "i", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "h", "c", "ch", "sh", "sht", "u", "y", "yu", "ya"];

function isUpper(chr) {
  return (chr == chr.toLowerCase()) ? false : true;
}

function translateFromEn() {
  let result = "";
  let lastWord = "а";
  let ind = 0;

  inpt = document.getElementById("outpt");
  outpt = document.getElementById("inpt");

  for (let letter of inpt.value.split('')) {
    ind = enArr.indexOf(letter.toLowerCase());

    if (ind == -1) {
      result += letter;
      continue;
    }
    if (lastWord == "и" && letter == "я") {
      result += "a";
      continue;
    }

    result += (isUpper(letter)) ? bgArr[ind].toUpperCase() : bgArr[ind];

    lastWord = letter.toLowerCase();

  };
  outpt.value = result;


}

function translateFromBg() {
  let result = "";
  let lastWord = "а";
  let ind = 0;

  inpt = document.getElementById("inpt");
  outpt = document.getElementById("outpt");

  for (let letter of inpt.value.split('')) {
    ind = bgArr.indexOf(letter.toLowerCase());

    if (ind == -1) {
      result += letter;
      continue;
    }
    if (lastWord == "и" && letter == "я") {
      result += "a";
      continue;
    }

    result += (isUpper(letter)) ? enArr[ind].toUpperCase() : enArr[ind];

    lastWord = letter.toLowerCase();

  };
  outpt.value = result;

}
