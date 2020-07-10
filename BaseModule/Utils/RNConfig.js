export const RNConfig = {
    currencyName: {
        POUND: 'pound',
        EURO: 'euro',
        DOLLAR: 'dollar',
        DINAR: 'dinar',
        RUPEES: 'rupees',
        VATU: 'vatu'
    },
    country: {
        UK: 1,
        IRE: 2,
        AUS: 3,
        NZ: 4
    },
    TAX_TEXT: {
        UK: 'VAT',
        IRE: 'VAT',
        AUS: 'GST',
        NZ: 'GST'
    },
    supportNumber: {
        UK: '+441782444282',
        IRE: '+35315682849',
        AUS: '+610285034155',
        NZ: '+64800767027'
    },
    default: {
        timeZone: 'Europe/London',
        locale: 'united kingdom',
        country: 'UK',
        countryID: 1,
        currency: '£'
    },
    clientType: {
        BIGFOODIE: 'BIGFOODIE',
        FOODHUB: 'FOODHUB'
    },
    maxPostCode: {
        UK: 8,
        IRE: 25,
        AUS_NZ: 4
    },
    postcodeRegex: {
        UK: '^[a-zA-Z0-9\\s]{2,45}$',
        IRE: '^[a-zA-Z0-9\\s]{2,15}$',
        AUS_NZ: '^[0-9]{4}$'
    }
};
