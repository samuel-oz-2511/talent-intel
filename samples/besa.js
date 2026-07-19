(function () {
  if (sessionStorage.getItem('sk_ok') !== '1') {
    location.replace('../index.html');
    return;
  }
  var params = new URLSearchParams(location.search);
  var lang = params.get('lang') || sessionStorage.getItem('sk_lang') || 'he';

  window.setLang = function (l) {
    var isHe = l === 'he';
    document.getElementById('c-he').style.display = isHe ? '' : 'none';
    document.getElementById('c-en').style.display = isHe ? 'none' : '';
    document.documentElement.lang = isHe ? 'he' : 'en';
    document.documentElement.dir = isHe ? 'rtl' : 'ltr';
    document.getElementById('sw-he').classList.toggle('on', isHe);
    document.getElementById('sw-en').classList.toggle('on', !isHe);
    var note = document.getElementById('demo-note');
    if (note) note.textContent = isHe
      ? 'דוגמת תוצר אמיתית של BeSa. כל הפרטים המזהים בדויים או הוסוו לצורך הדגמה.'
      : 'A real BeSa deliverable format. All identifying details are fictionalized or masked for demonstration.';
    var back = document.getElementById('back-link');
    if (back) back.textContent = isHe ? 'חזרה לעמוד הראשי' : 'Back to main page';
  };
  setLang(lang);
})();
