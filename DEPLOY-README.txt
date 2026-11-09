SENSERIO WEBSITE — GITHUB PAGES PACKAGE

Upload the CONTENTS of this folder to the ROOT of the existing GitHub repository.
Do not upload the ZIP file itself.

Includes all site pages, shared CSS/JavaScript, images, favicon, 404 page,
robots.txt, .nojekyll, and CNAME.

Contact details:
Phone display: +17789514797
Phone link: tel:+17789514797
Email: houman@senserio.ca

QUOTE FORM BEHAVIOUR:
The quote form on request-a-quote.html submits directly to Senserio via the
FormSubmit service (formsubmit.co), delivering the enquiry to
houman@senserio.ca. No account or backend is needed. The first submission
triggers an activation email from FormSubmit to houman@senserio.ca - click
the activation link in that email or submissions will not be delivered.
If sending fails (no network, or the form is not activated yet), the page
shows an email draft addressed to houman@senserio.ca plus a Copy button, so
no enquiry is lost. quote.html redirects to request-a-quote.html; the old
5-step form on quote.html is retired. A thank-you page (thank-you.html) is
shown after no-JavaScript submissions.
Before replacing the live site:
1. Keep a backup of the current repository.
2. Upload all files and folders from this package to repository root.
3. Keep GitHub Pages configured for the main branch and root folder.
4. Preserve/verify the custom domain senserio.ca in GitHub Pages settings.
5. Test phone link, email link, every page, and quote form after deployment.


LATEST UPDATE: Replaced the broken construction-welding.jpg (it was a screenshot of the website with text baked in) with a proper construction welding photo, and replaced the duplicated custom-fabrication.jpg with a distinct workshop photo. Fixed the quote form to submit directly via FormSubmit with an email-draft fallback. Added the missing construction-welding.html page (it previously 404'd) and redirected the retired quote.html to request-a-quote.html. Fixed the mobile header so the brand can no longer collide with the Menu button, and the floating contact buttons now lift above the footer instead of covering footer text.
