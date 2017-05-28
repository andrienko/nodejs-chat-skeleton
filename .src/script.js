$(function(){
  const usernameGenerator = require('username-generator');

  const ui = {
    form: $('.inputs'),
    content: $('.content'),
    message: $('#message'),
    main: $('.main'),
    name_change: $('#name_change'),
    user_details: $('#user_details'),
    nickname: $('#name'),
    nickname_save: $('#name_save'),
    modal:$('.modal'),

    message_template: _.template($('#msg').html()),

    init: function(){
      this.scroll();

      this.form.on('submit', (e)=>{
        e.preventDefault();
        chat_app.sendMessage(chat_app.name,this.message.val());
        this.message.val('');
        this.scroll();
        return false;
      });

      this.message.focus();

      this.initModal();

    },

    initModal: function () {
      this.name_change.click(()=>{
        this.modal.show();
        this.nickname.focus().val(chat_app.name);
      });

      this.nickname_save.click(()=>{
        chat_app.name = this.nickname.val();
        localStorage['nickname'] = chat_app.name;
        this.modal.hide();
      });
    },


    scroll:function () {
      this.main.scrollTop(this.main[0].scrollHeight);
    },

    addMessage: function (data) {
      data = {...{'cls':'default'}, ...data};

      if(data.msg && data.msg.indexOf('/me')===0){
        data.msg = data.name + ' ' + data.msg.slice(4);
        data.cls = data.cls + ' me';
      }

      const date = new Date(data.time);
      data.time =
        ('0'+date.getHours())  .slice(-2)
        + ':' +
        ('0'+date.getMinutes()).slice(-2)
        + ':' +
        ('0'+date.getSeconds()).slice(-2)
      ;

      data.msg =  data.msg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

      this.content.append(this.message_template(data));
    }
  };

  const chat_app = {
    name: null,
    socket: null,

    init:function () {
      this.name = localStorage['nickname'] || usernameGenerator.generateUsername();
      ui.init();
      this.connect();
    },

    sendMessage:function (name, message) {
      this.socket.emit('message_sent',{
        name:name,
        msg:message
      });
    },

    afterConnect: function () {
      this.socket.on('message', function (data) {
        ui.addMessage(data);
      });
    },

    connect:function () {
      try {
        this.socket = io.connect({query:"name="+this.name});
        this.afterConnect();
      } catch (e) {
        console.log('Could not connect to socket.',e);
      }
    }
  };

  chat_app.init();

});