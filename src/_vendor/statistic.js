function SS(){ // Send Statistic
  var args = arguments;
  var debug = function(){ console.log('stat:',arguments); };

  // Google Analytics
  if(typeof ga === 'function'){
    args = ['send', 'event'].concat(args);
    ga.apply(null, args); // jshint ignore:line
    debug.apply('ga()',args);
  }else if(typeof _gaq !== 'undefined'){
    args = ['_trackEvent'].concat(args);
    _gaq.push(args); // jshint ignore:line
    debug.apply('_gaq()',args);
  }else{
    debug("Гугл Аналитикс не подключен:", args);
  }

  // Yandex Metrika
  if(typeof yaCounter !== 'undefined'){
    yaCounter.reachGoal(args.join('_')); // jshint ignore:line
    debug.apply('yaCounter()',args);
  }
}

$(function(){
  $(document).on('click', '[data-ss-category]', function(){
    var self = $(this);
    if(!self.data('ss-action')){
      console.log('У объекта нет обязательного параметра data-ss-action', this);
      return true;
    }
    var args = [], it, keys = ['category', 'action', 'label', 'value'];
    for (var i in keys) {
      it = self.data('ss-'+keys[i]);
      if(it){
        args.push(it);
      }
    }
    SS.apply(null, args);
  });

  $(document).on('click', '[data-ss]', function(){
    SS.apply(null, $(this).data('ss').split(','));
  });
});
