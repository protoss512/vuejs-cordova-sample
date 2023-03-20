import i18n from './i18n';

export function checkVersion() {
    if (window.hasOwnProperty("cordova")) {
        return window.cordova.platformId
    } else {
        return 'web'
    }
}

export function getLang() {
    let mystyle = "font-size: 100%;"
    let font_size = i18n.t("small")
    let f = localStorage.getItem('Font_size')
    if (f == i18n.t("small")) {
        mystyle = "font-size: 100%;"
        font_size = i18n.t("small")
    } else if (f == i18n.t("middle")) {
        mystyle = "font-size: 125%;"
        font_size = i18n.t("middle")
    } else if (f == i18n.t("large")) {
        mystyle = "font-size: 150%;"
        font_size = i18n.t("large")
    }
    return [mystyle, font_size]
}
