(function(){
  document.addEventListener('DOMContentLoaded', function(){
    document.addEventListener('click', function(e){
      var filter = e.target.closest('.tag-filter');
      if (!filter) return;

      var filterTag = filter.dataset.tag;

      document.querySelectorAll('span.tag-filter').forEach(function(el){
        el.classList.remove('active');
      });
      filter.classList.add('active');

      document.querySelectorAll('.tag-group').forEach(function(group){
        group.querySelectorAll('*').forEach(function(el){
          if (el.dataset.tag === filterTag) {
            el.classList.add('active');
          }
        });
      });

      var items = document.querySelectorAll('.project-item');
      if (filter.classList.contains('all')) {
        items.forEach(function(item){
          item.classList.remove('not-show');
        });
      } else {
        items.forEach(function(item){
          var itemTags = JSON.parse(item.getAttribute('data-tags') || '[]');
          if (itemTags.indexOf(filterTag) === -1) {
            item.classList.add('not-show');
          } else {
            item.classList.remove('not-show');
          }
        });
      }
    });
  });
})();
