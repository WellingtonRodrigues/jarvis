(function($) {
  $(document).ready(function() {
    $('.js-duplicate-row').on('focus', function(e) {
      var $this = $(this);

      var $closestFormGroup = $this.closest('.form-group');
      var $newFormGroup = $this
        .closest('.form-group')
        .clone();

      $newFormGroup
        .insertBefore($closestFormGroup)
        .find('input[type="text"]')
        .removeAttr('placeholder')
        .focus()

      $newFormGroup
        .find(':disabled')
        .prop('disabled', false);
    });

    $(document).on('click', '.js-remove-row', function(e) {
      e.preventDefault();

      $(this)
        .closest('.form-group')
        .remove();
    });
  });
})(jQuery);
