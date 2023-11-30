const wordsToTranslate = {
    0: { en: "Plane", ukr: "Літак", answer: "", },
    1: { en: "Development", ukr: "Розвиток", answer: "", },
    2: { en: "Success", ukr: "Успіх", answer: "", },
    3: { en: "To celebrate", ukr: "Святкувати", answer: "", },
    4: { en: "Demure", ukr: "Скромний", answer: "", },
    5: { en: "Consequence", ukr: "Наслідок", answer: "", },
    6: { en: "Freedom", ukr: "Свобода", answer: "", },
    7: { en: "Butterfly", ukr: "Метелик", answer: "", },
    8: { en: "Mysterious", ukr: "Таємничий", answer: "", },
    9: { en: "To cut", ukr: "Різати", answer: "", },
    10: { en: "To breathe", ukr: "Дихати", answer: "", },
    11: { en: "Variety", ukr: "Різноманітність", answer: "", },
    12: { en: "Education", ukr: "Освіта", answer: "", },
    13: { en: "Together", ukr: "Разом", answer: "", },
    14: { en: "To gather", ukr: "Збирати", answer: "", },
    lenth: 15,
}

document.addEventListener("DOMContentLoaded", () => {
    let showUserResult;
    let userFieldActive;
    let actualStage;
    let numberOfCards = wordsToTranslate.lenth;
    let wordsLeft = numberOfCards;
    let translatedCorrectly;
    let mistakes;
    let wordsToTranslate_array;

    function init(numberOfCards) {
        for (let i = 0; i < wordsToTranslate.lenth; i++) wordsToTranslate[i].answer = '';
        wordsToTranslate_array = [];
        showUserResult = false;
        userFieldActive = true;
        actualStage = 0;
        wordsLeft = numberOfCards;
        translatedCorrectly = 0;
        mistakes = 0;
        // Ініціалізація масиву
        for (let i = 0; i < wordsToTranslate.lenth; i++) {
            wordsToTranslate_array.push(wordsToTranslate[i]);
        }
        for (let i = 0; i < wordsToTranslate.lenth; i++) {
            let rand = Math.floor(Math.random() * numberOfCards);
            let value = wordsToTranslate_array[i];
            wordsToTranslate_array[i] = wordsToTranslate_array[rand];
            wordsToTranslate_array[rand] = value;
        }
        wordsToTranslate_array = wordsToTranslate_array.slice(0, numberOfCards);
        $("#word-to-translate").html(wordsToTranslate_array[actualStage].eng);
        newStage(); newResults(); inputAllowed();
        $("#user-word").focus();
    }
    //Початок виконання
    /*$("input[type='radio']").checkboxradio({ icon: true });*/
    numberOfCards = Math.floor(wordsToTranslate.lenth * 0.35)
    init(numberOfCards);

    $("input[name='difficulty']").change(function () {
        switch ($(this).val()) {
            case 'Primary':
                numberOfCards = Math.floor(wordsToTranslate.lenth * 0.35)
                init(numberOfCards);
                break;
            case 'Intermediate':
                numberOfCards = Math.floor(wordsToTranslate.lenth * 0.7)
                init(numberOfCards);
                break;
            case 'Advanced':
                numberOfCards = wordsToTranslate.lenth;
                init(numberOfCards);
                break;
            default: alert("Error occured!");
                break;
        }
    });

    // Перезапис значень поточного етапу та обнулення перекладу користувача
    function newStage() {
        $("#actual-stage").html((actualStage + 1) + "/" + numberOfCards);
        $("#user-word").val(wordsToTranslate_array[actualStage].answer);
    }
    // Задання значень елементам
    $("#word-to-translate").html(wordsToTranslate_array[actualStage].en);
    newStage();
    newResults();
    $("#user-word").focus();
    // Відображення результатів
    function newResults() {
        wordsLeft = 0;
        translatedCorrectly = 0;
        mistakes = 0;
        wordsToTranslate_array.forEach((card) => {
            if (card.answer == null || card.answer.trim() == "") {
                wordsLeft++;
                return;
            }
            if (card.ukr.toLowerCase() == card.answer.trim().toLowerCase()) {
                translatedCorrectly++;
                $("#number-of-correct").css("font-weight", "bold");
            }
            else { mistakes++; }
        });
        $("#number-of-correct").css("font-weight", "bold");
        $("#number-of-mistakes").css("font-weight", "bold");
        $("#words-left-number").css("font-weight", "bold");
        $("#number-of-correct").html(translatedCorrectly);
        $("#number-of-mistakes").html(mistakes);
        $("#words-left-number").html(wordsLeft);
        // Користувач переклав усі слова
        if (wordsLeft == 0 && !showUserResult) { information(); showUserResult = true; }
    }

    // Модальне вікно
    function information() {
        let wind = " Your result is " + translatedCorrectly + " correct out of " + numberOfCards + " words. To try again, refresh the page.";
        if (translatedCorrectly / numberOfCards == 1) { wind = "Your English is at a high level!" + wind; }
        else if (translatedCorrectly / numberOfCards >= 0.7) { wind = "You've done well, but you still have work to do!" + wind; }
        else if (translatedCorrectly / numberOfCards > 0.5) { wind = "Hurray! You are halfway to success!" + wind; }
        else { wind = "Perhaps, you should get serious about learning English!" + wind; }
        $("#wind p").html(wind);
        $("#wind").dialog().css("background", "url('./images/background2.jpg') no-repeat center center fixed");
    }
    function inputNotAllowed() {
        userFieldActive = false;
        $("#user-word").attr("disabled", true);
        $("#back, #next").css("background-color", "rgb(0, 145, 255)");
    };
    function inputAllowed() {
        userFieldActive = true;
        $("#user-word").attr("disabled", false);
        $("#back, #next").css("background-color", "white");
        if (actualStage == 0) {
            $("#back").css("background-color", "rgb(0, 145, 255)");
        }
        if (actualStage == (numberOfCards - 1)) {
            $("#next").css("background-color", "rgb(0, 145, 255)");
        }
        $("#user-word").focus();
    };
    function userScore() { wordsToTranslate_array[actualStage].answer = $("#user-word").val(); }
    function noUserWord() { $("#user-word").val(''); }  // Обнулення перекладу

    // Введення за допомогою клавіші Enter
    $('#user-word').keypress(function (elem) {
        var key = elem.which;
        if (key == 13) {    // Код Enter
            if (actualStage == numberOfCards - 1 && wordsLeft > 1)
                $("#back").click();
            else {}
                $("#next").click();
        }
    });

    // Перехід на попереднє слово
    $("#back").click(function () {
        if (userFieldActive && actualStage > 0) {
            inputNotAllowed();
            // Нова відповідь -> нові результати
            if (wordsToTranslate_array[actualStage].answer == '') { userScore(); newResults(); }
            noUserWord();
            actualStage--;
            newStage();

            /*$("#test-card").hide("slide", { direction: "right" }, 250).promise().done(function () {
                $("#word-to-translate").html(wordsToTranslate_array[actualStage].en);
                $("#test-card").show("slide", 250).promise().done(inputAllowed);
            });*/

            $("#test-card").fadeTo(500, 0.2).promise().done(function () {
                $("#word-to-translate").html(wordsToTranslate_array[actualStage].en);
                $("#test-card").fadeTo(500, 1).promise().done(inputAllowed);
            });

            /*$(document).ready(function(){
                
                $("#test-card").hide();
                
                
                $("#test-card").show();
                
              });*/


            /*$("#test-card").on("click", {transform: "center", transition: "all .7s ease"});*/
        }
    });

    // Перехід на наступне слово
    $("#next").click(function () {
        if (actualStage == numberOfCards - 1 && wordsLeft == 1) {
            if (wordsToTranslate_array[actualStage].answer == '') { userScore(); newResults(); }
        }
        if (userFieldActive && actualStage < numberOfCards - 1) {
            inputNotAllowed();
            // Нова відповідь -> нові результати
            if (wordsToTranslate_array[actualStage].answer == '') { userScore(); newResults(); }
            noUserWord();
            actualStage++;
            newStage();

            /*$("#test-card").hide("slide", 250).promise().done(function () {
                $("#word-to-translate").html(wordsToTranslate_array[actualStage].en);
                $("#test-card").show("slide", { direction: "right" }, 250).promise().done(inputAllowed);
            });*/

            $("#test-card").fadeTo(500, 0.2).promise().done(function () {
                $("#word-to-translate").html(wordsToTranslate_array[actualStage].en);
                $("#test-card").fadeTo(500, 1).promise().done(inputAllowed);
            });
        }
    });
    $("#back").hover(function () { if (userFieldActive) { $("#back").css("background-color", "rgb(0, 145, 255)"); } });
    $("#back").mouseleave(function () { if (userFieldActive && actualStage != 0) { $("#back").css("background-color", "white"); } });
    $("#next").hover(function () { if (userFieldActive) { $("#next").css("background-color", "rgb(0, 145, 255)"); } });
    $("#next").mouseleave(function () { if (userFieldActive && actualStage != (numberOfCards - 1)) { $("#next").css("background-color", "white"); } });
});
