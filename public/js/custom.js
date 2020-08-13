document.body.style.overflow = 'hidden';

let currentTip;
const tipsQueue = [];

$(document).ready(function () {
    getTips();
});

function getTips() {
    $.getJSON('http://localhost:8080/?user=DLYA8ek6aQLRQCKd9om', function (data) {
        const tips = data.tips;
        for (let x = 0; x < tips.length; x++) {
            if (!tipsQueue.includes(tips[x])) {
                tipsQueue.push(tips[x]);
            }
        }
        currentTip = tipsQueue[tipsQueue.length - 1];
        showTip();
    })

}

function showTip() {
    if (currentTip) {
        $("#display").fadeIn(250, function () {
            $(".tipInfos").text(`${currentTip.sender} a donné ${currentTip.amount}€`);
            $(".tipMessage").text(currentTip.message);
            
            setTimeout(hideTip, 5000);
            $("#dataArea").animate({
                height: 75
            }, 500);
        });
    } else {
        getTips();
    }
}

function hideTip() {
    $("#display").fadeOut(250, function () {
        $("#dataArea").animate({
            height: 0
        }, 250, function () {
            currentTip = null;
            setTimeout(getTips, 5000);
        });
    });
}