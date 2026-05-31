# Aman Web Craft — API Contracts

## Auth
- POST /api/admin/login  { username, password } → { token }
- Token passed as `Authorization: Bearer <token>` header for all admin endpoints.
- Default admin: `aman / craft2025` (stored in Mongo on seed).

## Public Read
- GET /api/profile → profile doc (single)
- GET /api/skills
- GET /api/services
- GET /api/projects
- GET /api/testimonials
- GET /api/blogs
- GET /api/blogs/:slug
- GET /api/blogs/:id/comments

## Public Write
- POST /api/orders { name, email, company, service, budget, timeline, brief } → order
- POST /api/messages { name, email, msg } → message
- POST /api/blogs/:id/like { liked: bool } → { likes }
- POST /api/blogs/:id/comments { name, text } → comment
- POST /api/blogs/:id/comments/:cid/reply { name, text } → reply

## Admin (Bearer token required)
- PUT  /api/profile body=profile
- CRUD /api/skills  POST / PUT /:id / DELETE /:id
- CRUD /api/services POST / PUT /:id / DELETE /:id
- CRUD /api/projects POST / PUT /:id / DELETE /:id
- CRUD /api/testimonials POST / PUT /:id / DELETE /:id
- CRUD /api/blogs  POST / PUT /:id / DELETE /:id
- GET  /api/orders, PATCH /api/orders/:id { status }, DELETE /api/orders/:id
- GET  /api/messages, DELETE /api/messages/:id
- POST /api/admin/seed — (idempotent) populate Mongo from defaults if empty
- GET  /api/admin/stats → counts

## Ids
- All resources use string `id` (uuid4). Mongo `_id` removed from response.

## Frontend integration
- `src/services/api.js` wraps axios with REACT_APP_BACKEND_URL + `/api` prefix and bearer header.
- Pages fetch via hooks; loading + error states shown.
- WhatsApp buttons use `<a href="https://wa.me/918160618149?text=..." target="_blank" rel="noopener">` (no window.open since sandbox blocks api.whatsapp.com).
- Admin dashboard has full CRUD forms for skills, services, projects, testimonials and blogs; lists for orders & messages with status / delete.

## Routing (multi-page)
- /                  Home (hero + teaser cards + CTA)
- /about             About (story + timeline)
- /skills            Skills (animated grid + categories)
- /services          Services (pricing cards)
- /projects          Projects (full grid + filter)
- /order             Order (dedicated page)
- /blog              Blog list
- /blog/:slug        Blog post
- /contact           Contact (dedicated)
- /adminaman         Admin login
- /adminaman/dashboard Admin dashboard (CRUD)

## Data replacement map (mock.js → backend)
- profile, skills, services, projects, testimonials, blogPosts, blogComments → Mongo collections
- localStorage `awc_orders`, `awc_messages`, `awc_comments_*`, `awc_likes_*`, `awc_admin` → backend equivalents (`awc_admin` still used client-side to hold JWT)
- ADMIN_CREDENTIALS → backend verify
