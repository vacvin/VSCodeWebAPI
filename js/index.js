window.onload = function () {
    this.app = new Vue({
        el: '#app',
        data: {
            users: "wait loading.",
            ID: ''
        },
        methods: {
            QueryUser: function (event) {
                $.ajax({
                    context: this,
                    url: 'http://localhost:5000/api/user/' + event.target.value,
                    success: function(res){
                        this.users = [];
                        this.users.push(res);
                    }
                });
            },
            QueryUserAll: function (event) {
                $.ajax({
                    context: this,
                    url: 'http://localhost:5000/api/user',
                    success: function(res){
                        this.users = res;
                    }
                });
            }
        }
    })

    this.app.QueryUserAll();
}