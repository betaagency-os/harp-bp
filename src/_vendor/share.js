var Share = {
  // Шаринг ссылок
  vk: function(purl) {
    Share._link('http://vkontakte.ru/share.php?url=', purl);
  },

  ok: function(purl) {
    Share._link('http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=', purl);
  },

  fb: function(purl) {
    Share._link('http://www.facebook.com/sharer.php?s=100&u=', purl);
  },

  mailru: function(purl) {
    Share._link('http://connect.mail.ru/share?url=', purl);
  },

  tw: function(text) {
    Share._popup('http://twitter.com/share?text='+encodeURIComponent(text));
  },

  // Общие функции
  _link: function(prefix, purl) {
    var url;
    if(purl && !purl.match(/^http/)){
      var name = purl.replace(/\?.*/, '');
      var suffix = purl.replace(/^.*\?/, '');
      url = CONFIG.baseurl+'/share/'+name+'.html?'+suffix; // jshint ignore:line
    }else{
      url = purl || document.location.href;
    }
    if(ENV === 'production'){ // jshint ignore:line
      Share._popup(prefix+encodeURIComponent(url));
    }else{
      console.log('Шаринг', prefix, url);
    }
  },
  _popup: function(url) {
    window.open(url,'','toolbar=0,status=0,width=626,height=436');
  }
};

$(function(){
  $(document).on('click', '[data-share]', function(){
    var self = $(this);
    Share[self.data('share')](self.data('share-url'));
  });
});
