window.onload = function () {
    this.app = new Vue({
        el: '#app',
        data: {
            users: "wait loading."
        }
    })

    this.UserController = new UserController();

    this.ShowUserLsit = function(){
        var _UserData = this.UserController.getUserData();
        app.users = _UserData;        
    }
    
    this.UserController.getUsers(this.ShowUserLsit);    
}

UserController = function () {
    this.UserData;
    
    this.getUsers = function (callback) {
        $.ajax({
            context: this,
            url: 'http://localhost:5000/api/user',
            success: function(res){
                this.UserData = res;
                callback();
            }
        });
    }

    this.getUserData = function () {
        return this.UserData;
    }
}