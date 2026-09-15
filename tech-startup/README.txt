RISE ACCOUNTING PPC LANDING PAGE
================================
Live URL: https://go4shubham.github.io/rise-accounting-lp/
Public repo: https://github.com/go4shubham/rise-accounting-lp
Last update: 14 Sep 2026

--------------------------------
1. WHAT THIS IS
--------------------------------
A one-file HTML landing page built to run behind Google Ads / Meta paid traffic
for Rise Accounting. Everything is in a single index.html file with no build
step. Copy, service list, chatbot answers, FAQ, and reviews are all editable
from one JavaScript config block at the top of index.html (window.RISE).

--------------------------------
2. FILE STRUCTURE
--------------------------------
index.html            (the whole page, ~2000 lines)
assets/               (34 files: images, fonts, logos, hero + CTA photos)
README.txt            (this file)

--------------------------------
3. HOW TO EDIT COPY
--------------------------------
All editable copy sits inside the window.RISE object at the top of index.html:

  services   ->  the 24 service cards (title, one-line description, category)
  why        ->  the 8 "What Rise Accounting does for you" items
  reviews    ->  the client review carousel content
  steps      ->  the 4-step "Up and running in less than a week" list
  faqs       ->  the 8 FAQ questions and answers
  bot        ->  the chatbot chips, trigger keywords, canned answers

Save the file and refresh the page. No build step.

For hero H1 + lede copy, edit the plain HTML in the <section class="hero">
block further down index.html.

For colour and font, edit the :root CSS variables at the top of the <style>
block.

--------------------------------
4. HOW TO CONNECT THE HUBSPOT FORM
--------------------------------
The "Talk to an expert" button currently opens a native pop-up form built into
index.html. To swap it for the HubSpot form:

Option A: HubSpot embed (single form)
  a. Grab your HubSpot portal ID and form ID from the HubSpot UI.
  b. Paste the standard HubSpot embed script into the <div id="modal"> block,
     replacing the existing <form> markup.
  c. Keep the [data-form] click handler as-is. It opens the modal.

Option B: HubSpot two-step form
  Requires a slightly heavier setup because HubSpot embed does not natively
  render two steps in one popup.
  Recommended path:
    Step 1 form: collects email + company name only. On submit, fire a custom
                 event that swaps to Step 2.
    Step 2 form: collects revenue band, headcount, and preferred call time.
                 On submit, HubSpot creates the contact + deal.
  You can either build both as HubSpot embed forms and toggle visibility with
  JS, or use HubSpot's built-in progressive profiling on a single embed.
  We can help wire this if you send over the target field list.

--------------------------------
5. HOW TO CONNECT THE CHATBOT (LIVE MODE)
--------------------------------
The chatbot is currently a scripted responder (offline). Chip labels, trigger
keywords and canned answers are all inside window.RISE.bot in index.html.

To replace with a live chatbot:
  - HubSpot Chatflows: drop the HubSpot tracking script into <head> and remove
    the local #botBtn markup. HubSpot bubble takes over.
  - Intercom / Drift / Crisp: same pattern. Their script self-injects the
    launcher.

If you want the scripted responder + a live chat fallback, keep the current
markup and add a "Talk to a real person" chip that opens the HubSpot chat.

--------------------------------
6. HOSTING
--------------------------------
Any static host works. The whole site is HTML + CSS + JS + images, no server.

Current host: GitHub Pages (free, HTTPS included). If you prefer:
  - Vercel / Netlify: drag-and-drop deploy. Custom domain in 2 clicks.
  - Your own web host: upload index.html + assets/ into any public folder.
  - Rise Accounting subdomain: point a CNAME at the host of choice.

--------------------------------
7. CHANGES SHIPPED ON SEP 14
--------------------------------
See the "Rise Accounting PPC LP - Sep 14 Updates" doc in the same Drive folder
for the full change list plus the chatbot content spec.

--------------------------------
8. QUESTIONS
--------------------------------
Contact: mishra.shubham.14ce5513@gmail.com
