window.fourwaypb = window.fourwaypb || {};
window.fourwaypb.time_attack_records = window.fourwaypb.time_attack_records || {};

window.fourwaypb.time_attack_records.ready = function() {
    
    let ready = false;
    let records = null;
    let HeaderList = [
        {
            key: "meta",
            header: "Meta",
            collapse: false,
            last_value: null,
            formatter: (x) => {
                return window.fourwaypb.metaKeyToName(x);
            }
        },
        {
            key: "quest",
            header: "Planet",
            collapse: false,
            last_value: null,
            formatter: (x) => {
                return window.fourwaypb.planetKeyToName(x.planet);
            }
        },
        {
            key: "quest",
            header: "Quest",
            collapse: false,
            last_value: null,
            formatter: (x) => {
                return x.name;
            }
        },
        {
            key: "rank",
            header: "Rank",
            collapse: false,
            last_value: null,
            formatter: (x) => {
                return window.fourwaypb.rankKeyToName(x);
            }
        },
        {
            key: "date",
            header: "Date",
            collapse: false,
            last_value: null,
            formatter: (x) => {
                return dateFns.format(x, 'MM/DD/YYYY');
            }
        },
        {
            key: "time",
            header: "Time",
            collapse: false,
            last_value: null,
            formatter: (x) => {
                return secondsToString(x);
            }
        },
        {
            key: "team",
            header: "Team",
            collapse: false,
            last_value: null,
            formatter: (x) => {
                return (x ? x.name : "");
            }
        },
        {
            key: "players",
            header: "Players",
            collapse: false,
            last_value: null,
            formatter: (x) => {
                return playerNamesToList(x);
            }
        },
        {
            key: "players",
            header: "POV",
            collapse: false,
            last_value: null,
            formatter: (x) => {
                return playerPOVToList(x);
            }
        },
        {
            key: "players",
            header: "Classes",
            collapse: false,
            last_value: null,
            formatter: (x) => {
                return playerClassesToList(x);
            }
        },
        {
            key: "players",
            header: "Races",
            collapse: false,
            last_value: null,
            formatter: (x) => {
                return playersToRaceList(x);
            }
        },
    ]
    let SearchSettings = {
        modes: [],
        metas: [],
        planets: [],
        ranks: [],
        date: null,
        categories: [],
        players: [],
        classes: [],
        races: [],
        teams: [],
        quests: [],
    };
    
    let RESULT_ELEMENT_TEMPLATE = `
    <tr>
        __ELEMENT_VALUE_LIST__
    </tr>
    `
    let RESULT_ELEMENT_VALUE_TEMPLATE = `
    <td>
        __VALUE__
    </td>
    `
    let RESULT_HEADER_TEMPLATE = `
    <th>
        <a>
            __HEADER__
        </a>
    </th>
    `
    let RESULT_LIST_TEMPLATE = `
    <table class="ui selectable inverted table">
        <thead>
            <tr>
                __HEADER_LIST__
            </tr>
        </thead>
        <tbody>
        __ELEMENT_LIST__
        </tbody>
    </table>
    `
    
    function metaToName(code){
        switch(code){
            case 'clementine': return "Clementine";
            default: return "Unknown";
        }
    }
    
    function secondsToString(seconds){
        let format = 'mm:ss';
        if (seconds >= 3600) {
            format = 'HH:mm:ss';
        }
        return moment.unix(moment.duration().add(seconds, 's').asSeconds()).utc().format(format);
    }
    
    function playerNamesToList(arr){
        let result = '';
        for (let i = 0; i < arr.length; i++) {
            if (i != 0) {
                result += '</br>';
            }
            result += arr[i].name;
        }
        return result;
    }
    function playerPOVToList(arr){
        let result = '';
        for (let i = 0; i < arr.length; i++) {
            if (i != 0) {
                result += '</br>';
            }
            if (arr[i].video) {
                result += '<a href="'+arr[i].video+'">POV</a>';
            }
        }
        return result;
    }
    function playerClassesToList(arr){
        let result = '';
        for (let i = 0; i < arr.length; i++) {
            if (i != 0) {
                result += '</br>';
            }
            result += window.fourwaypb.classKeyToName(arr[i].class);
        }
        return result;
    }
    function playersToRaceList(arr){
        let result = '';
        for (let i = 0; i < arr.length; i++) {
            if (i != 0) {
                result += '</br>';
            }
            result += window.fourwaypb.raceKeyToName(arr[i].race);
        }
        return result;
    }
    
    function xor(a, b) {
        return (a || b) && !(a && b);
    }
    
    function filterData() {
        let data = records;
        // Do all filters
        data = _.filter(data, function(x) {
            // Record included by default
            // If no options in a group are selected, keep it that way
            // If options in a group are selected, only include matching ones
            let result = true;
            
            // Mode
            if (SearchSettings.modes.length > 0) {
                let group = false;
                SearchSettings.modes.forEach(function (mode) {
                    if (x.mode == mode) {
                        group = true;
                    }
                });
                
                if (!group) {
                    result = false;
                }
            }
            // Meta
            if (SearchSettings.metas.length > 0) {
                let group = false;
                SearchSettings.metas.forEach(function (meta) {
                    if (x.meta == meta) {
                        group = true;
                    }
                });
                
                if (!group) {
                    result = false;
                }
            }
            // Planet
            if (SearchSettings.planets.length > 0) {
                let group = false;
                SearchSettings.planets.forEach(function (planet) {
                    if (x.planet == planet) {
                        group = true;
                    }
                });
                
                if (!group) {
                    result = false;
                }
            }
            // Rank
            if (SearchSettings.ranks.length > 0) {
                let group = false;
                SearchSettings.ranks.forEach(function (rank) {
                    if (x.rank == rank) {
                        group = true;
                    }
                });
                
                if (!group) {
                    result = false;
                }
            }
            // Rank
            if (SearchSettings.date) {
                let group = false;
                if (dateFns.isBefore(dateFns.parse(x.date), SearchSettings.date)) {
                    group = true;
                }
                
                if (!group) {
                    result = false;
                }
            }
            // Category
            if (SearchSettings.categories.length > 0) {
                let group = false;
                SearchSettings.categories.forEach(function (category) {
                    if (x.category == category) {
                        group = true;
                    }
                });
                
                if (!group) {
                    result = false;
                }
            }
            // Player names
            if (SearchSettings.players.length > 0) {
                let group = false;
                SearchSettings.players.forEach(function (player) {
                    for (let i = 0; i < x.players.length; i++) {
                        if (x.players[i].id == player) {
                            group = true;
                            break;
                        }
                    }
                });
                
                if (!group) {
                    result = false;
                }
            }
            // Classes
            if (SearchSettings.classes.length > 0) {
                let group = false;
                SearchSettings.classes.forEach(function (className) {
                    for (let i = 0; i < x.players.length; i++) {
                        if (x.players[i].class == className) {
                            group = true;
                            break;
                        }
                    }
                });
                
                if (!group) {
                    result = false;
                }
            }
            // Races
            if (SearchSettings.races.length > 0) {
                let group = false;
                SearchSettings.races.forEach(function (race) {
                    for (let i = 0; i < x.players.length; i++) {
                        if (x.players[i].race == race) {
                            group = true;
                            break;
                        }
                    }
                });
                
                if (!group) {
                    result = false;
                }
            }
            // Team names
            if (SearchSettings.teams.length > 0) {
                let group = false;
                SearchSettings.teams.forEach(function (team) {
                    if (x.team != null && x.team.id == team) {
                        group = true;
                    }
                });
                
                if (!group) {
                    result = false;
                }
            }
            // Quest names
            if (SearchSettings.quests.length > 0) {
                let group = false;
                SearchSettings.quests.forEach(function (quest) {
                    if (x.quest != null && x.quest.id == quest) {
                        group = true;
                    }
                });
                
                if (!group) {
                    result = false;
                }
            }
            
            return result;
        });
        return data;
    }
    function updateResults() {
        if (!ready) {
            $('#results').empty().append('Records not loaded');
            return;
        }
        
        let data = filterData();
        
        // Sort by time and group by quest (flatten afterwards)
        data = _.sortBy(data, function(x) {
            if (x.quest.is_countdown) {
                return x.time * -1;
            } else {
                return x.time;
            }
        });
        data = _.groupBy(data, x => x.quest.id);
        data = _.flatMap(data, x => x);
    
        let result_string = RESULT_LIST_TEMPLATE.substring(0);
        // build header list
        let headerList_string = "";
        for(let i=0; i < HeaderList.length; i++){
            let header_string = RESULT_HEADER_TEMPLATE.substring(0);
            header_string = header_string.replace(/__HEADER__/g, HeaderList[i].header)
            headerList_string += header_string;
        }
        // build results list
        let elementList_string = "";
        for(let d=0; d < data.length; d++){
            let current_quest = data[d];
            let quest_row_string = "";
    
            for(let i=0; i < HeaderList.length; i++){
                let element_string = RESULT_ELEMENT_VALUE_TEMPLATE.substring(0);
                let formatter = HeaderList[i].formatter;
                let value = formatter(current_quest[HeaderList[i].key]);
                
                if (current_quest.quest.is_countdown && HeaderList[i].key == 'time') {
                    value = "Remaining: "+value;
                }
                
                if (HeaderList[i].collapse && HeaderList[i].last_value == value) {
                    element_string = element_string.replace("__VALUE__","");
                } else {
                    element_string = element_string.replace("__VALUE__",value);
                    HeaderList[i].last_value = value;
                }
                quest_row_string += element_string;
            }
            quest_row_string = RESULT_ELEMENT_TEMPLATE.substring(0).replace("__ELEMENT_VALUE_LIST__",quest_row_string);
            elementList_string += quest_row_string;
        }
        result_string = result_string.replace("__HEADER_LIST__",headerList_string);
        result_string = result_string.replace("__ELEMENT_LIST__",elementList_string);
    
        $('#results').empty().append(result_string);
    }
    
    function updateSearchSettings() {
        SearchSettings.modes = $('#modes').dropdown('get values');
        SearchSettings.metas = $('#metas').dropdown('get values');
        SearchSettings.planets = $('#planets').dropdown('get values');
        SearchSettings.ranks = $('#ranks').dropdown('get values');
        SearchSettings.date = $('#date').calendar('get date');
        SearchSettings.categories = $('#categories').dropdown('get values');
        SearchSettings.players = $('#players').dropdown('get values');
        SearchSettings.classes = $('#classes').dropdown('get values');
        SearchSettings.races = $('#races').dropdown('get values');
        SearchSettings.teams = $('#teams').dropdown('get values');
        SearchSettings.quests = $('#quests').dropdown('get values');
    }
    
    $('#search').on('click', function() {
        updateSearchSettings();
        updateResults();
        $('html, body').animate({
            scrollTop: $("#results").offset().top - 50,
        }, 500);
    });
    
    function updateDropdownColumns() {
        let elements = $('.columned');
        elements.removeClass('column one two three four');
        
        elements.each(function() {
            let max_columns = $(this).data('max-columns');
            if (window.innerWidth <= 375 || max_columns < 2) {
                $(this).addClass('one');
            } else if (window.innerWidth <= 480 || max_columns < 3) {
                $(this).addClass('two');
            } else if (window.innerWidth <= 768 || max_columns < 4) {
                $(this).addClass('three');
            } else {
                $(this).addClass('four');
            }
            $(this).addClass('column');
        });
    }
    
    function setupPage() {
        $('#modes').dropdown({
            values: [
                {
                    name: 'Normal',
                    value: 'normal'
                },
                {
                    name : 'GAM',
                    value : 'gam',
                }
            ]
        });
        $('#metas').dropdown({
            values: [
                {
                    name: 'Clementine',
                    value: 'clementine'
                }
            ]
        });
        $('#planets').dropdown({
            values: [
                {
                    name: 'GUARDIANS Colony',
                    value: 'guardians_colony'
                },
                {
                    name: 'Parum',
                    value: 'parum'
                },
                {
                    name: 'Neudaiz',
                    value: 'neudaiz'
                },
                {
                    name: 'Moatoob',
                    value: 'moatoob'
                }
            ]
        });
        $('#ranks').dropdown({
            values: [
                {
                    name: 'C',
                    value: 'c'
                },
                {
                    name: 'B',
                    value: 'b'
                },
                {
                    name: 'A',
                    value: 'a'
                },
                {
                    name: 'S',
                    value: 's'
                },
                {
                    name: 'S2',
                    value: 's2'
                },
                {
                    name: 'S3',
                    value: 's3'
                },
                {
                    name: 'S4',
                    value: 's4'
                }
            ]
        });
        $('#categories').dropdown({
            values: [
                {
                    name : '1P',
                    value : '1p',
                },
                {
                    name : '2P',
                    value : '2p',
                },
                {
                    name : '3P',
                    value : '3p',
                },
                {
                    name : '4P',
                    value : '4p',
                },
                {
                    name : '5P',
                    value : '5p',
                },
                {
                    name : '6P',
                    value : '6p',
                }
            ]
        });
        $('#classes').dropdown({
            values: [
                {
                    name: 'Hunter',
                    value: 'hunter'
                },
                {
                    name: 'Ranger',
                    value: 'ranger'
                },
                {
                    name: 'Force',
                    value: 'force'
                },
                {
                    name: 'Fighgunner',
                    value: 'fighgunner'
                },
                {
                    name: 'Guntecher',
                    value: 'guntecher'
                },
                {
                    name: 'Wartecher',
                    value: 'wartecher'
                },
                
                {
                    name: 'Fortefighter',
                    value: 'fortefighter'
                },
                {
                    name: 'Fortegunner',
                    value: 'fortegunner'
                },
                
                {
                    name: 'Fortetecher',
                    value: 'fortetecher'
                },
                {
                    name: 'Protranser',
                    value: 'protranser'
                },
                {
                    name: 'Acrofighter',
                    value: 'acrofighter'
                },
                {
                    name: 'Acrotecher',
                    value: 'acrotecher'
                },
                {
                    name: 'Fighmaster',
                    value: 'fightmaster'
                },
                {
                    name: 'Gunmaster',
                    value: 'gunmaster'
                },
                {
                    name: 'Masterforce',
                    value: 'masterforce'
                }
            ]
        });
        $('#races').dropdown({
            values: [
                {
                    name: 'Human',
                    value: 'human'
                },
                {
                    name: 'Newman',
                    value: 'newman'
                },
                {
                    name: 'Beast',
                    value: 'beast'
                },
                {
                    name: 'Cast',
                    value: 'cast'
                }
            ]
        });
        
        let players = [];
        records.forEach(function(record) {
            record.players.forEach(function(player) {
                let current_player = players.find(x => x.id == player.id);
                if (current_player == undefined) {
                    players.push(player);
                }
            });
        });
        players = _.sortBy(players, ['name']);
        
        let players_dropdown = {
            values: [],
        };
        players.forEach(function(player) {
            players_dropdown.values.push({
                value: player.id,
                //text: player.name,
                name: player.name,
            });
        });
        $('#players').dropdown(players_dropdown);
        
        let teams = [];
        records.forEach(function(record) {
            if (record.team != null) {
                let current_team = teams.find(x => x.id == record.team.id);
                if (current_team == undefined) {
                    teams.push(record.team);
                }
            }
        });
        teams = _.sortBy(teams, ['name']);
        
        let teams_dropdown = {
            values: [],
        };
        teams.forEach(function(team) {
            teams_dropdown.values.push({
                value: team.id,
                //text: team.name,
                name: team.name,
                image: url_for(team.image),
            });
        });
        $('#teams').dropdown(teams_dropdown);
        
        let quests = [];
        records.forEach(function(record) {
            if (record.quest != null) {
                let current_quest = quests.find(x => x.id == record.quest.id);
                if (current_quest == undefined) {
                    quests.push(record.quest);
                }
            }
        });
        quests = _.sortBy(quests, ['name']);
        
        let quests_dropdown = {
            values: [],
        };
        quests.forEach(function(quest) {
            quests_dropdown.values.push({
                value: quest.id,
                //text: quest.name,
                name: quest.name,
            });
        });
        $('#quests').dropdown(quests_dropdown);
        
        
        $(window).on('resize', _.debounce(function () {
            updateDropdownColumns();
        }, 250));
        updateDropdownColumns();
    };
    
    getJSON5(url_for('data/records.json'), (function(data) {
        records = data;
        
        setupPage();
        
        ready = true;
        console.log('Page ready');
    }));
};

window.addEventListener('DOMContentLoaded', function() {
    window.fourwaypb.time_attack_records.ready();
});
