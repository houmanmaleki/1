// SENSERIO website interactions
document.querySelector('.menu')?.addEventListener('click', () => {
  const button = document.querySelector('.menu');
  const nav = document.querySelector('.nav');
  const isOpen = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', String(isOpen));
  button.textContent = isOpen ? 'Close ×' : 'Menu ☰';
});

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item =>
      item.setAttribute('aria-pressed', String(item === button))
    );
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = button.dataset.filter !== 'All' &&
        card.dataset.category !== button.dataset.filter;
    });
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Support service-specific links such as request-a-quote.html?service=construction-welding.
const serviceSelect = document.querySelector('#service');
if (serviceSelect) {
  const requestedService = new URLSearchParams(window.location.search).get('service');
  const serviceMap = {
    'construction-welding': 'Construction Welding',
    'architectural-metalwork': 'Architectural Metalwork',
    'welding-fabrication': 'Welding & Fabrication'
  };
  if (serviceMap[requestedService]) serviceSelect.value = serviceMap[requestedService];
}

const quoteForm = document.querySelector('#quote-form');
quoteForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;

  const data = new FormData(quoteForm);
  const rows = [];
  for (const [key, value] of data.entries()) {
    if (key === 'privacy' || !String(value).trim()) continue;
    const label = key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    rows.push(`${label}: ${String(value).trim()}`);
  }

  const projectTitle = String(data.get('project-title') || 'New project').trim();
  const subject = `Senserio quote request: ${projectTitle}`;
  const body = [
    'Hello Senserio,',
    '',
    'I would like to request a quote. My project details are below:',
    '',
    ...rows,
    '',
    'Thank you.'
  ].join('\n');

  const mailto = `mailto:houman@senserio.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const status = document.querySelector('#form-status');
  status.hidden = false;
  status.innerHTML = '<strong>Your quote request is ready.</strong><p>Choose the button below to open an email addressed to Senserio. Review the details and press Send. This static website cannot send or store submissions by itself.</p><a class="btn" id="open-email-draft" href="#">Open email draft →</a><p class="email-fallback">If the email app does not open, email <a class="text-link" href="mailto:houman@senserio.ca">houman@senserio.ca</a> directly.</p>');
  const openLink = document.querySelector('#open-email-draft');
  openLink.href = mailto;
  openLink.addEventListener('click', () => {
    status.querySelector('p').textContent =
      'If your email app did not open, check your browser email settings or copy the details and email houman@senserio.ca.';
  }, { once: true });
  status.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
