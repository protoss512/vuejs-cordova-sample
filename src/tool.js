import i18n from './i18n';

export function checkVersion() {
    if (window.hasOwnProperty("cordova")) {
        return window.cordova.platformId
    } else {
        return 'web'
    }
}

export function getSpeechRate() {
    let rate = 0.7
    let s = localStorage.getItem('Speech_rate1')
    if (s == '0') {
        rate = 0.7
    } else if (s == '1') {
        rate = 0.8
    } else if (s == '2') {
        rate = 0.9
    }
    return rate
}

export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function getLang() {
    let mystyle = "font-size: 100%;"
    let font_size = i18n.t("small")
    let f = localStorage.getItem('Font_size1')
    if (f == '0') {
        mystyle = "font-size: 100%;"
        font_size = i18n.t("small")
    } else if (f == '1') {
        mystyle = "font-size: 125%;"
        font_size = i18n.t("middle")
    } else if (f == '2') {
        mystyle = "font-size: 150%;"
        font_size = i18n.t("large")
    }
    return [mystyle, font_size]
}

