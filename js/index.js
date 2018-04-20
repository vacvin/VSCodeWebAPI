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
                if(event.target.value == '')
                {
                    this.QueryUserAll();
                    return;
                }

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
                        this.$emit('testevent','123');
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

    Vue.component('userlist-header', {
        template: '<div>' + 
                  '<div class="header cell w20">ID</div>' + 
                  '<div class="header cell w80">Name</div>' + 
                  '<div class="header cell w160">Birthday</div>' +
                  '<div class="header cell w240">CreateTime</div>' +
                  '<div class="header cell w80">Delete</div>' +
                  '</div>'
    });

    Vue.component('userlist', {
        props: ['user'],
        template: '<div>' + 
                  '<div class="cell w20">{{ user.id }}</div>' + 
                  '<div class="cell w80">{{ user.name }}</div>' + 
                  '<div class="cell w160">{{ user.birthday }}</div>' +
                  '<div class="cell w240">{{ user.createTime }}</div>' +
                  '<div class="cell w80"><button v-on:click="deleteUser(user.id)">Delete</button></div>' +
                  '</div>',
        methods: {
            deleteUser: function (id) {
                //this.$emit('deleteUser', id);
                this.$parent.deleteUser(id);
            }
        },
    });
    
    this.app.QueryUserAll();

    this.app.$on('testevent', function(value){
        //Do something
    }, this);
}