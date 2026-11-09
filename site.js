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
    if (key.startsWith('_') || key === 'privacy' || !String(value).trim()) continue;
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
  const showFallback = () => {
    status.hidden = false;
    status.innerHTML = '<strong>Could not send automatically.</strong><p>Your request was not sent. Use the button below to open an email with the details filled in, or copy them and email <a class="text-link" href="mailto:houman@senserio.ca">houman@senserio.ca</a> directly.</p><p><a class="btn" id="open-email-draft" href="#">Open email draft &rarr;</a> <button class="btn outline" type="button" id="copy-details">Copy details</button></p><pre id="quote-draft" style="white-space:pre-wrap;font-size:.85rem;margin:12px 0 0"></pre>';
    const draft = document.querySelector('#quote-draft');
    draft.textContent = `Subject: ${subject}\n\n${body}`;
    const openLink = document.querySelector('#open-email-draft');
    openLink.href = mailto;
    document.querySelector('#copy-details').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(draft.textContent);
        document.querySelector('#copy-details').textContent = 'Copied';
      } catch (e) {
        const range = document.createRange();
        range.selectNodeContents(draft);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.querySelector('#copy-details').textContent = 'Selected \u2014 press Ctrl+C';
      }
    });
    status.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  status.hidden = false;
  status.innerHTML = '<strong>Sending&hellip;</strong><p>Please wait while your request is sent to Senserio.</p>';
  fetch(quoteForm.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
    .then(response => {
      if (!response.ok) throw new Error('send failed');
      status.innerHTML = '<strong>Request sent.</strong><p>Thank you \u2014 your quote request has been sent to Senserio. We will be in touch about the next steps.</p>';
      quoteForm.reset();
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    })
    .catch(showFallback);
});

// Lift the floating contact buttons above the footer so they never cover footer text.
const quickActions = document.querySelector('.quick-actions');
const footerBottom = document.querySelector('.footer-bottom');
if (quickActions && footerBottom && 'IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    quickActions.classList.toggle('lifted', entries[0].isIntersecting);
  }).observe(footerBottom);
}
