let app = new Vue({
    el: '#app',
    template:
        '<div>' +
            '<lab-header />' +
            '<login-message :error="error" :message="message"/>' +
            '<login-form />' +
        '</div>',
    data: {
        error: frontendData.error,
        message: frontendData.message
    }
});