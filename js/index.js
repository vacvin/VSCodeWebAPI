window.onload = function () {
    this.app = new Vue({
        el: '#app',
        data: {
            users: "wait loading.",
            ID: '',
            name: '',
            birthday: ''
        },
        methods: {
            QueryUser: function (event) {
                $.ajax({
                    context: this,
                    url: 'api/user/' + event.target.value,
                    success: function(res){
                        this.users = [];
                        this.users.push(res);
                    }
                });
            },
            QueryUserAll: function (event) {
                $.ajax({
                    context: this,
                    url: 'api/user',
                    success: function(res){
                        this.users = res;
                    }
                });
            },
            addUser: function () {
                var data = {
                    Name: this.name,
                    Birthday: this.birthday
                }
                $.ajax({
                    context: this,
                    type: "POST",
                    data :JSON.stringify(data),
                    url: "api/user/",
                    contentType: "application/json",
                    success: function(res){
                        this.QueryUserAll();
                    }
                });
            },
            deleteUser: function (id) {
                $.ajax({
                    context: this,
                    type: 'DELETE',
                    url: 'api/user/' + id,
                    success: function(res){
                        this.QueryUserAll();
                    }
                });
            }
        }
    })

    this.app.QueryUserAll();
}