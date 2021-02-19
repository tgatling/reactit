import * as ReactNative from 'react-native';
import I18n from 'react-native-i18n';

import en from './locales/en.json';
import fr from './locales/fr.json';

// Define a fallback if the user selects a language we don't support
I18n.fallbacks = true;

I18n.translations = {
    en,
    fr
}

const currentLocale = I18n.currentLocale();

// Is it a RightToLeft language?
export const isRTL = currentLocale.indexOf('he') === 0
//Then we need to set that in our manager
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name: string, params = {}) {
    return I18n.t(name, params);
}

export default I18n;