import moment from 'moment-timezone';
export const TB_DATE_FORMAT_TO_SERVER = 'YYYY-MM-DD';
export const TB_TIME_FORMAT_TO_SERVER = 'HH:mm';
export const TB_DATE_AND_TIME_FORMAT_TO_SERVER = 'YYYY-MM-DD HH:mm:ss';
export const TB_DATE_FORMAT_DISPLAY = 'DD MMM';
export const TB_DATE_FORMAT_DISPLAY_LIST = 'DD MMM YYYY';
export const TB_DATE_FORMAT_DISPLAY_LIST_SECONDS = 'DD MMM YYYY HH:mm:ss';
export const DEFAULT_PAGE_NUMBER_PAGINATION = 1;
export const TB_PENDING_DISPLAY_DATE = 'ddd DD MMM';
export const DATE_TIME_FORMAT_M_DISPLAY_LIST = 'DD MMM YYYY, HH:mm a';

/*
Date Format Reference

https://docs.oracle.com/cd/E41183_01/DR/Date_Format_Types.html
 */

export const getDateString = (dateStr) => {
    let date = moment(dateStr, DATE_FORMAT.YYYY_MM_DD_HH_MM_SS, true).toDate();
    let now = new Date();
    let yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    let lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);
    if (now.getDate() === date.getDate()) {
        return moment(date).format('HH:mm');
    } else if (yesterday.getDate() === date.getDate()) {
        return moment(date).format('[Yesterday] HH:mm');
    } else if (lastWeek.getTime() < date.getTime()) {
        return moment(date).format('ddd HH:mm');
    } else {
        return moment(date).format('d MMM');
    }
};

export const DATE_FORMAT = {
    YYYY_MM_DD_HH_MM_SS: 'YYYY-MM-DD HH:mm:ss',
    DD_MM_YYYY_HH_MM: 'DD-MM-YYYY HH:mm',
    DD_MMM_YYY__HH_MM: 'DD MMM YYYY, HH:mm',
    DD_MMM_YYYY: 'DD MMM YYYY',
    DD_MM_YYYY: 'DD-MM-YYYY',
    HH_mm: 'HH:mm',
    YYYY_MM_DD: 'YYYY-MM-DD'
};

export const getDisplayFormatTypeMDateTime = (dateTimeStr) => {
    return moment(dateTimeStr, [TB_DATE_AND_TIME_FORMAT_TO_SERVER]).format(DATE_TIME_FORMAT_M_DISPLAY_LIST);
};
