var child = {
  created: function(){
    this.$on('click-child', function(){
      console.log('send ajax here');
    });
  },
  template: '<div></div>'
};


var app = {
  template: '<div><button v-on:click="clickParent">点击</button><child v-ref:child></child><div>',
  methods: {
    clickParent: function(){
       this.$refs.child.$emit('click-child');
    }
  },
  components: {
    child: child
  }
};


new Vue({el: 'body', components: {app: app}});
