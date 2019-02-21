let app = new Vue({
    el: '#app',
    template:
        '<div>' +
            '<div class="column left">' +
                '<lab-header />' +
                '<result-form :username="username" :results="results"/>' +
                '<history-table :results="results" />' +
                '<logout-form :username="username"/>' +
            '</div>' +
            '<div class="column right">' +
                '<minefield />' +
            '</div>' +
        '</div>',
    data: {
        results: frontendData.results,
        username: frontendData.username
    }
});