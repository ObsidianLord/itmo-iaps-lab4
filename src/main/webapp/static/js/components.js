const resultApi = Vue.resource('/result');

Vue.component('lab-header', {
    template:
        '<div class="border shadow hl header">' +
            '<p>Лебеденко&nbsp;Глеб&nbsp;Сергеевич</p>' +
            '<p>Гринштерн&nbsp;Вячеслав&nbsp;Эдуардович</p>' +
            '<p>Группа&nbsp;P3201</p>' +
            '<p>Вариант&nbsp;18140</p>' +
        '</div>'
});

Vue.component('login-message', {
    props: ['error', 'message'],
    template:
       '<div v-if="error" class="border shadow hl main bad-row info">' +
            '{{error}}' +
       '</div>' +
       '<div v-else-if="message" class="border shadow hl main good-row info">' +
            '{{message}}' +
       '</div>'
});

Vue.component('login-form', {
   template:
       '<div class="border shadow hl main">' +
            '<form method="post" action="/login">' +
                '<label for="username">' +
                    '<span class="login-span">Логин:</span>' +
                    '<input type="text" class="text" id="username" name="username" />' +
                '</label>' +
                '<label for="password">' +
                    '<span class="login-span">Пароль:</span>' +
                    '<input type="password" class="text" id="password" name="password" />' +
                '</label>' +
                '<input type="submit" value="Войти" />' +
            '</form>' +
       '</div>'
});

Vue.component('result-form', {
    props: ['username', 'results'],
    data: function() {
        return {
            x: 0,
            hiddenX: 0,
            y: 0,
            r: 3
        }
    },
    template:
        '<div class="border shadow hl rform">' +
            '<label class="result-label" for="x-select">' +
                '<span>X:</span>' +
                '<select id="x-select" v-model="x" @change="updateHiddenX">' +
                    '<option value="3">3</option>' +
                    '<option value="2">2</option>' +
                    '<option value="1">1</option>' +
                    '<option selected value="0">0</option>' +
                    '<option value="-1">-1</option>' +
                    '<option value="-2">-2</option>' +
                    '<option value="-3">-3</option>' +
                    '<option value="-4">-4</option>' +
                    '<option value="-5">-5</option>' +
                '</select>' +
            '</label>' +
            '<label class="result-label" for="y-text">' +
                '<span>Y:</span>' +
                '<input type="text" id="y-text" class="text" v-model="y" />' +
            '</label>' +
            '<label class="result-label" for="r-select">' +
                '<span>R:</span>' +
                '<select id="r-select" v-model="r" >' +
                    '<option selected value="3">3</option>' +
                    '<option value="2">2</option>' +
                    '<option value="1">1</option>' +
                    '<option value="0">0</option>' +
                    '<option value="-1">-1</option>' +
                    '<option value="-2">-2</option>' +
                    '<option value="-3">-3</option>' +
                    '<option value="-4">-4</option>' +
                    '<option value="-5">-5</option>' +
                '</select>' +
            '</label>' +
            '<input type="hidden" id="x-hidden" v-model="hiddenX">' +
            '<input type="button" id="result-button" value="Проверить" @click="check" onclick="validate()"/>' +
        '</div>',
    methods: {
        check: function() {
            let result = {
                owner: this.username,
                x: this.hiddenX,
                y: this.y,
                r: this.r
            };
            resultApi.save({}, result).then(out =>
                out.json().then(data => {
                    if (data.x != 666) this.results.push(data);
                })
            )
        },
        updateHiddenX: function() {
            this.hiddenX = this.x;
        }
    }
});

Vue.component('history-head', {
    template:
    '<tr>' +
        '<th>Дата и время проверки</th>' +
        '<th>Координата X</th>' +
        '<th>Координата Y</th>' +
        '<th>Радиус</th>' +
        '<th>Результат</th>' +
    '</tr>'
});

Vue.component('history-table', {
    props: ['results'],
    template:
    '<div class="border shadow hl previous-checks">' +
        '<div class="title">Результаты прошлых проверок</div>' +
        '<table id="history_table">' +
            '<history-head />' +
            '<tr v-bind:class="result.correct == 1 ? `good-row` : `bad-row`" v-for="result in reverseResults">' +
                '<td>{{result.checkDate}}</td>' +
                '<td class="x">{{result.x}}</td>' +
                '<td class="y">{{result.y}}</td>' +
                '<td>{{result.r}}</td>' +
                '<td class="c">{{result.correct == 1 ? "Попадание" : "Промах"}}</td>' +
            '</tr>' +
        '</table>' +
    '</div>',
    computed: {
        reverseResults() {
            return this.results.slice().reverse();
        }
    }
});

Vue.component('logout-form', {
    props: ['username'],
    template:
        '<form class="border shadow hl header" method="post" action="/logout">' +
            '<div class="auth-info">Вы вошли как <span id="un">{{username}}</span></div>' +
            '<input type="submit" value="Выйти" />' +
        '</form>'
});

Vue.component('minefield', {
    template:
        '<canvas class="shadow main" width="800" height="600" id="canvas" title="Область"></canvas>'
});