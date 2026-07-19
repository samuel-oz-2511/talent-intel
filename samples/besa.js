(function () {
  var params = new URLSearchParams(location.search);
  var lang = params.get('lang') || localStorage.getItem('sk_lang') || 'he';
  var CODE = atob('SUFJMjAyNg==');

  window.setLang = function (l) {
    lang = l;
    localStorage.setItem('sk_lang', l);
    var isHe = l === 'he';
    document.getElementById('c-he').style.display = isHe ? '' : 'none';
    document.getElementById('c-en').style.display = isHe ? 'none' : '';
    document.documentElement.lang = isHe ? 'he' : 'en';
    document.documentElement.dir = isHe ? 'rtl' : 'ltr';
    document.getElementById('sw-he').classList.toggle('on', isHe);
    document.getElementById('sw-en').classList.toggle('on', !isHe);
    var note = document.getElementById('demo-note');
    if (note) note.textContent = isHe
      ? 'פורמט תוצר אמיתי של BeSa. כל הפרטים המזהים בדויים או הוסוו לצורך הדגמה.'
      : 'A genuine BeSa deliverable format with sample data. All identifying details are fictional or masked for demonstration.';
    var back = document.getElementById('back-link');
    if (back) back.textContent = isHe ? 'חזרה לעמוד הראשי' : 'Back to main page';
  };

  if (localStorage.getItem('sk_ok') === '1') {
    setLang(lang);
    return;
  }

  document.getElementById('c-he').style.display = 'none';
  document.getElementById('c-en').style.display = 'none';

  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:200;background:#0b1220;display:flex;align-items:center;justify-content:center;padding:24px;';
  overlay.innerHTML =
    '<div style="width:100%;max-width:360px;text-align:center;color:#e6e9f0;font-family:Heebo,sans-serif;">' +
    '<div style="font-weight:800;letter-spacing:.12em;color:#8ea8f5;margin-bottom:24px;">BESA · SAMPLE</div>' +
    '<p style="font-size:.92rem;color:#9aa4b8;margin-bottom:18px;">הזינו קוד גישה · Enter access code</p>' +
    '<input id="bs-code" type="password" autocomplete="off" style="width:100%;padding:13px 16px;border-radius:10px;border:1px solid #2a3650;background:#131c30;color:#fff;font-size:1rem;text-align:center;letter-spacing:.15em;outline:none;direction:ltr;">' +
    '<button id="bs-go" style="width:100%;margin-top:12px;padding:12px;border-radius:10px;border:none;font-size:.95rem;font-weight:600;cursor:pointer;background:#2757d6;color:#fff;font-family:inherit;">כניסה · Enter</button>' +
    '<div id="bs-err" style="color:#f97066;font-size:.85rem;margin-top:12px;min-height:1.2em;"></div>' +
    '<p style="margin-top:18px;font-size:.78rem;color:#7c8698;">לא קיבלתם קוד? · No code? <a href="mailto:samuel@skemper.co" style="color:#8ea8f5;">samuel@skemper.co</a></p>' +
    '</div>';
  document.body.appendChild(overlay);

  function tryUnlock() {
    var v = document.getElementById('bs-code').value.trim();
    if (v.toUpperCase() === CODE) {
      localStorage.setItem('sk_ok', '1');
      overlay.remove();
      setLang(lang);
    } else {
      document.getElementById('bs-err').textContent = 'קוד שגוי · Incorrect code';
      document.getElementById('bs-code').focus();
      document.getElementById('bs-code').select();
    }
  }
  document.getElementById('bs-go').addEventListener('click', tryUnlock);
  document.getElementById('bs-code').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') tryUnlock();
  });
  document.getElementById('bs-code').addEventListener('input', function () {
    document.getElementById('bs-err').textContent = '';
  });
})();
