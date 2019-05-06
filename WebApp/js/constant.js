
(function () {
    'use strict';

    app.constant('Constant', {
        // HttpCookie
        NTS_COOKIE_KEY: 'NTSUSERINFO',
        NTS_USER_INFO_KEY: {
            LANG: 'LANG_CURRENT'
        },
        ITEM_GET: {
            URL: 'app/json/:itemfile',
            JSON_FILE: '%formid%.%lang%.json'
        },
        MESSAGE_GET: {
            URL: 'app/json/:messagefile',
            JSON_FILE: 'message.%lang%.json'
        },
        DEFAULT_LANG: 'VI',
        LANG_FILE: {
            VI: 'vi',
            US: 'en-US'
        },
        LANG_COOKIE: {
            VI: 'vi',
            US: 'en-US'
        },
        LANG_NAME: {
            VI: 'VIET NAM',
            US: 'ENGLISH'
        },
        FLOW_TYPE: {
            NO_CAME: '1',
            DOCTOR: '2',
            THERAPY_WAIT: '3',
            THERAPY: '4',
            XRAY: '5',
            PAY: '6',
            YOGA: '7'
        },
        TIME_TYPE: {
            ON_GOING: '1',
            ON_START: '2'
        },
        LIST_BANK: [
            {
                Url: '../img/bank/visa.png',
                ID: 1
            },
            {
                Url: '../img/bank/master.png',
                ID: 2
            },
            {
                Url: '../img/bank/agribank.png',
                ID: 3
            },
            {
                Url: '../img/bank/acb.png',
                ID: 4
            },
            {
                Url: '../img/bank/bidv.png',
                ID: 5
            },
            {
                Url: '../img/bank/mbbank.png',
                ID: 6
            },
            {
                Url: '../img/bank/sacombank.png',
                ID: 7
            },
            {
                Url: '../img/bank/techcombank.png',
                ID: 8
            },
            {
                Url: '../img/bank/vietcombank.png',
                ID: 9
            }
        ]
    });
})();
