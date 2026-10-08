# CA Firm Website Starter

A responsive one-page starter website made with plain HTML, CSS, and vanilla JavaScript.

## Run locally

Open `index.html` in a modern browser. No build step is required. The two font families load from Google Fonts; the page falls back to system fonts if those fonts are unavailable.

## Replace before publishing

- Replace `Your Firm Name`, the `Y` mark, `[City, Country]`, email, phone number, and service descriptions with firm-approved information.
- Confirm which services the firm is authorized to advertise in its jurisdiction.
- Replace `hello@yourfirm.com` in `script.js` with the approved public enquiry address. The demo form then opens the visitor's email app. It does not submit to a server or store enquiries.
- Add the firm's approved privacy notice and review data handling, cookies, external fonts, and any analytics before launch.
- Do not request tax returns, identity documents, bank details, or confidential client records through an unsecured public form.
- Have a firm representative review professional titles, credentials, testimonials, claims, and disclaimers before launch.

## Motion and accessibility

The starter includes subtle hero movement, scroll reveals, card hover states, and a responsive menu. It respects `prefers-reduced-motion`; essential content remains available without animation. Review contrast, keyboard navigation, and the finished site against the firm's accessibility requirements before release.

## Team, clients, and animated totals

- **Our Team** (`#team`): six framed portrait cards and a responsive company organogram. All names, roles, reporting lines, and biographies are editable examples. Add or remove `<article class="team-card">` elements to fit your team.
- Replace each portrait's inline SVG `src` with your actual photo path, such as `images/managing-partner.jpg`, and update its `alt` text to the member's name. Keep the photo files alongside your website. No external image service is required for the placeholders.
- **Our Clients** (`#clients`): six example client cards, automatic rotation every 4.5 seconds, previous/next controls, selector dots, and a pause/start button. You can swipe on touchscreens or use arrow keys while the track has focus. Rotation pauses during hover, keyboard focus, and when the browser tab is hidden. Touch interaction pauses rotation until restarted.
- Replace each `[Client 01]` name and `client-logo` placeholder with an approved logo, for example `<img class="client-logo" src="images/client-01.png" alt="Client company name">`. Logo images can use `object-fit: contain` for different proportions.
- **Experience counters**: sample totals are 15+ years, 1,200+ projects, and 300+ clients. Update both `data-count` and the displayed number in `index.html`. Change `data-suffix` to remove or change the plus sign. These are count-up animations, running once when visible.
- Replace the sample figures and remove the placeholder notes after you have supplied accurate content.
- Reduced-motion visitors see the final numbers immediately, with carousel rotation initially paused. All cards and totals remain readable without JavaScript.

## Bangladesh content and design update

The page now includes six local service descriptions (audit, income tax/e-TIN, VAT/BIN, bookkeeping, advisory and RJSC company support), sector cards, a Bengali supporting sentence, five FAQs and direct links to official NBR, RJSC and ICAB resources. The copy does not specify tax rates or filing deadlines. Confirm each advertised service fits your firm's actual authorisation and engagement scope. Sample team roles, client slots and statistics remain labeled.

Motion additions include ambient hero particles, moving gradient text, floating service labels, staggered scroll entrances, pointer-sensitive card tilt/glow, animated buttons, photo effects, FAQ entrances, subtle hero parallax, a sticky navigation bar and reading-progress indicator. Use the **Pause animations** button to stop optional motion. System reduced-motion preferences are respected, including changes made while the page is open. Keyboard and touchscreen users can use the page without card tilt.

## Bangladesh SEO implemented

- English/Bangladesh language (`en-BD`) and a small Bengali element marked `lang="bn"`.
- Bangladesh-focused page title and a 145-character meta description.
- One descriptive H1 and a logical H2/H3 hierarchy; all substantive text is in the HTML and can be read without JavaScript.
- Open Graph and Twitter sharing metadata, plus `en_BD` Open Graph locale.
- Six `Service` JSON-LD entries with Bangladesh as the service area and descriptions matching visible services. No invented reviews, ratings, accreditation, address or awards.
- Responsive layouts, lazy-loaded portrait images with explicit dimensions, descriptive navigation, keyboard controls and reduced-motion support.
- Useful, visible FAQs and official reference links rather than repeated location keywords.

## Final SEO setup after you choose a real domain

1. Replace `Your Firm Name` everywhere, including title, description and sharing metadata. Replace every name, photo, sample statistic and client slot with confirmed content.
2. Add your actual address, email and phone to the contact section. Change the phone link from `#contact` to the matching real `tel:+880...` value. Update the enquiry email in `script.js` as well as the visible link.
3. Add these tags in `<head>`, using your actual homepage URL (not the example):

   ```html
   <link rel="canonical" href="https://YOUR-REAL-DOMAIN/">
   <meta property="og:url" content="https://YOUR-REAL-DOMAIN/">
   ```

4. Add an `AccountingService` JSON-LD business record only after verifying the firm's name, HTTPS URL, address, phone, logo and any claimed credentials. Use the same details on the page and your verified Google Business Profile. Do not add Dhaka, Chattogram or other city locations unless the firm actually serves or has an office there; describe the relationship accurately.
5. Export a real 1200 × 630 social image, host it on your domain and add matching `og:image` and `twitter:image` tags with an absolute HTTPS URL and alternative text. Use `twitter:card="summary_large_image"` once that image exists.
6. Serve the site over HTTPS. Configure `robots.txt` at the domain root to allow crawling and reference your actual sitemap. Create `sitemap.xml` containing the canonical homepage URL. Sections on this single-page site are not separate URLs for sitemap purposes.
7. Verify the domain in Google Search Console, submit the sitemap and inspect the published URL. Check structured data in Schema Markup Validator. Test performance and mobile usability on the hosted page. Structured data does not guarantee a rich result or a search ranking.
8. For a separate Bengali page, provide a complete Bengali translation first, then add reciprocal `hreflang` links to both pages. The single Bengali sentence does not make this an alternate Bengali page.

Search terms used naturally include “CA firm in Bangladesh,” “chartered accountant in Bangladesh,” audit, income tax, VAT, BIN, e-TIN, bookkeeping and RJSC support. Canonical URLs, business identity and location schema intentionally wait for your real details.

Official content references checked on 8 October 2026: https://nbr.gov.bd/ , https://roc.gov.bd/ , https://www.icab.org.bd/ . They are references, not endorsements or partner relationships.
