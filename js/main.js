window.fourwaypb = window.fourwaypb || {}

window.fourwaypb.classes = ['hunter', 'ranger', 'force', 'fighgunner', 'guntecher', 'wartecher', 'fortefighter', 'fortegunner', 'fortetecher', 'protranser', 'acrofighter', 'acrotecher', 'fighmaster', 'gunmaster', 'masterforce']

window.fourwaypb.races = ['human', 'newman', 'beast', 'cast']

window.fourwaypb.genders = ['male', 'female']

window.fourwaypb.planets = ['guardians_colony', 'parum', 'neudaiz', 'moatoob']

window.fourwaypb.ranks = ['c', 'b', 'a', 's', 's2', 's3', 's4']

window.fourwaypb.metas = ['clementine']

window.fourwaypb.classKeyToName = function (key) {
    switch (key) {
        case 'hunter':
            return 'Hunter'
        case 'ranger':
            return 'Ranger'
        case 'force':
            return 'Force'
        case 'fighgunner':
            return 'Fighgunner'
        case 'guntecher':
            return 'Guntecher'
        case 'wartecher':
            return 'Wartecher'
        case 'fortefighter':
            return 'Fortefighter'
        case 'fortegunner':
            return 'Fortegunner'
        case 'fortetecher':
            return 'Fortetecher'
        case 'protranser':
            return 'Protranser'
        case 'acrofighter':
            return 'Acrofighter'
        case 'acrotecher':
            return 'Acrotecher'
        case 'fighmaster':
            return 'Fighmaster'
        case 'gunmaster':
            return 'Gunmaster'
        case 'masterforce':
            return 'Masterforce'

        default:
            return 'Unknown'
    }
}
window.fourwaypb.raceKeyToName = function (key) {
    switch (key) {
        case 'human':
            return 'Human'
        case 'newman':
            return 'Newman'
        case 'beast':
            return 'Beast'
        case 'cast':
            return 'Cast'

        default:
            return 'Unknown'
    }
}

window.fourwaypb.planetKeyToName = function (key) {
    switch (key) {
        case 'guardians_colony':
            return 'GUARDIANS Colony'
        case 'parum':
            return 'Parum'
        case 'neudaiz':
            return 'Neudaiz'
        case 'moatoob':
            return 'Moatoob'

        default:
            return 'Unknown'
    }
}

window.fourwaypb.rankKeyToName = function (key) {
    switch (key) {
        case 'c':
            return 'C'
        case 'b':
            return 'B'
        case 'a':
            return 'A'
        case 's':
            return 'S'
        case 's2':
            return 'S2'
        case 's3':
            return 'S3'
        case 's4':
            return 'S4'
        default:
            return 'Unknown'
    }
}

window.fourwaypb.metaKeyToName = function (key) {
    switch (key) {
        case 'clementine':
            return 'Clementine'
        default:
            return 'Unknown'
    }
}

window.fourwaypb.decodeHTML = function (str) {
    var txt = document.createElement('textarea')
    txt.innerHTML = str
    return txt.value
}
window.fourwaypb.encodeHTML = function (str) {
    return str.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';'
    })
}

window.fourwaypb.ready = function () {
    var sidebar = $('#sidebar')
    sidebar.sidebar('setting', {
        transition: 'overlay',
        mobileTransition: 'uncover',
    })
    sidebar.sidebar('attach events', '.sidebar-button')

    if ($('.tabular.menu .item').length > 0) {
        $('.tabular.menu .item').tab()
    }
    if ($('.ui.accordion').length > 0) {
        $('.ui.accordion').accordion()
    }
    if ($('.ui.dropdown').length > 0) {
        $('.ui.dropdown').dropdown()
    }
    if ($('.ui.calendar.date').length > 0) {
        $('.ui.calendar.date').calendar({
            type: 'date',
            formatter: {
                date: function (date, settings) {
                    if (!date) {
                        return ''
                    }
                    //var day = date.getDate()
                    //var month = date.getMonth() + 1
                    //var year = date.getFullYear()
                    //return day + '/' + month + '/' + year;
                    return dateFns.format(date, 'MM/DD/YYYY')
                },
            },
        })
    }
    if ($('.ui.checkbox').not('[data-indeterminate="true"]').length > 0) {
        $('.ui.checkbox').not('[data-indeterminate="true"]').checkbox()
    }
}

window.addEventListener('DOMContentLoaded', function () {
    window.fourwaypb.ready()
})

function url_for(url) {
    return hexo_root + url
}
