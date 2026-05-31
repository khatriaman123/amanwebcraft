from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os, uuid, logging, hashlib, secrets
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ.get('JWT_SECRET', 'aman-web-craft-secret-2025')
JWT_ALGO = 'HS256'

app = FastAPI()
api = APIRouter(prefix="/api")

# ------------------------- Helpers -------------------------
def clean(doc: Optional[dict]):
    if not doc:
        return doc
    doc.pop('_id', None)
    return doc

def cleans(docs):
    return [clean(d) for d in docs]

def now_iso():
    return datetime.utcnow().isoformat()

def hash_pw(pw: str) -> str:
    return hashlib.sha256((pw + JWT_SECRET).encode()).hexdigest()

def create_token(username: str) -> str:
    payload = {'sub': username, 'exp': datetime.utcnow() + timedelta(days=7)}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)

async def require_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(401, 'Missing token')
    token = authorization.split(' ', 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
    except jwt.PyJWTError:
        raise HTTPException(401, 'Invalid token')
    return payload.get('sub')

# ------------------------- Models -------------------------
class LoginIn(BaseModel):
    username: str
    password: str

class Profile(BaseModel):
    name: str = 'Aman Web Craft'
    alias: str = 'AMAN'
    tagline: str = 'Full Stack Developer • Digital Solution Architect'
    headline: str = 'Crafting Premium Web Experiences, One Pixel at a Time.'
    sub: str = ''
    location: str = 'India'
    email: str = 'hello@amanwebcraft.dev'
    phone: str = '+91 81606 18149'
    whatsapp: str = '918160618149'
    whatsappMessage: str = "Hello Aman, I visited your portfolio and I'd like to discuss a project with you."
    experience: str = '5+ Years'
    projectsDelivered: int = 80
    clientsHappy: int = 60
    cupsOfCoffee: int = 2400
    github: str = 'https://github.com/amanwebcraft'
    linkedin: str = 'https://linkedin.com/in/amanwebcraft'
    twitter: str = 'https://twitter.com/amanwebcraft'
    photo: str = ''

class Skill(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    level: int
    category: str = 'Frontend'
    order: int = 0

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    desc: str
    icon: str = 'Star'
    order: int = 0

class Metric(BaseModel):
    k: str
    v: str

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    tech: List[str] = []
    summary: str
    cover: str
    live: str = '#'
    metrics: List[Metric] = []
    order: int = 0

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    quote: str
    rating: int = 5

class Reply(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    text: str
    date: str = Field(default_factory=lambda: datetime.utcnow().strftime('%Y-%m-%d'))

class Comment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    text: str
    date: str = Field(default_factory=lambda: datetime.utcnow().strftime('%Y-%m-%d'))
    replies: List[Reply] = []

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    excerpt: str
    content: str
    cover: str
    date: str = Field(default_factory=lambda: datetime.utcnow().strftime('%Y-%m-%d'))
    tag: str = 'Notes'
    read: str = '5 min'
    likes: int = 0
    comments: List[Comment] = []
    order: int = 0

class OrderIn(BaseModel):
    name: str
    email: str
    company: Optional[str] = ''
    service: str
    budget: str
    timeline: str
    brief: str

class Order(OrderIn):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = 'new'
    date: str = Field(default_factory=lambda: datetime.utcnow().strftime('%Y-%m-%d'))

class MessageIn(BaseModel):
    name: str
    email: str
    msg: str

class Message(MessageIn):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: str = Field(default_factory=lambda: datetime.utcnow().strftime('%Y-%m-%d'))

class CommentIn(BaseModel):
    name: str
    text: str

class LikeIn(BaseModel):
    liked: bool = True

# ------------------------- Auth -------------------------
@api.post('/admin/login')
async def login(body: LoginIn):
    doc = await db.admin.find_one({'username': body.username})
    if not doc or doc.get('password') != hash_pw(body.password):
        raise HTTPException(401, 'Invalid credentials')
    return {'token': create_token(body.username), 'username': body.username}

# ------------------------- Profile -------------------------
@api.get('/profile')
async def get_profile():
    doc = await db.profile.find_one({'_key': 'singleton'})
    if not doc:
        return Profile().dict()
    return clean(doc)

@api.put('/profile')
async def put_profile(body: Profile, _: str = Depends(require_admin)):
    await db.profile.update_one({'_key': 'singleton'}, {'$set': {**body.dict(), '_key': 'singleton'}}, upsert=True)
    return body.dict()

# ------------------------- Generic CRUD factory -------------------------
def make_crud(path: str, Model, collection: str, default_sort=('order', 1)):
    @api.get(f'/{path}')
    async def list_all():
        cursor = db[collection].find().sort(*default_sort)
        return cleans(await cursor.to_list(500))

    @api.post(f'/{path}')
    async def create(body: Model, _: str = Depends(require_admin)):
        doc = body.dict()
        await db[collection].insert_one(doc)
        return clean(doc)

    @api.put(f'/{path}/{{item_id}}')
    async def update(item_id: str, body: Model, _: str = Depends(require_admin)):
        data = body.dict()
        data['id'] = item_id
        res = await db[collection].update_one({'id': item_id}, {'$set': data}, upsert=True)
        return data

    @api.delete(f'/{path}/{{item_id}}')
    async def delete(item_id: str, _: str = Depends(require_admin)):
        res = await db[collection].delete_one({'id': item_id})
        return {'deleted': res.deleted_count}

make_crud('skills', Skill, 'skills')
make_crud('services', Service, 'services')
make_crud('projects', Project, 'projects')
make_crud('testimonials', Testimonial, 'testimonials', default_sort=('name', 1))

# ------------------------- Blogs (custom because of nested comments) -------------------------
@api.get('/blogs')
async def list_blogs():
    cursor = db.blogs.find().sort('date', -1)
    return cleans(await cursor.to_list(500))

@api.get('/blogs/{slug}')
async def get_blog(slug: str):
    doc = await db.blogs.find_one({'slug': slug})
    if not doc:
        raise HTTPException(404, 'Not found')
    return clean(doc)

@api.post('/blogs')
async def create_blog(body: BlogPost, _: str = Depends(require_admin)):
    doc = body.dict()
    await db.blogs.insert_one(doc)
    return clean(doc)

@api.put('/blogs/{blog_id}')
async def update_blog(blog_id: str, body: BlogPost, _: str = Depends(require_admin)):
    data = body.dict()
    data['id'] = blog_id
    await db.blogs.update_one({'id': blog_id}, {'$set': data}, upsert=True)
    return data

@api.delete('/blogs/{blog_id}')
async def delete_blog(blog_id: str, _: str = Depends(require_admin)):
    res = await db.blogs.delete_one({'id': blog_id})
    return {'deleted': res.deleted_count}

@api.post('/blogs/{blog_id}/like')
async def like_blog(blog_id: str, body: LikeIn):
    inc = 1 if body.liked else -1
    doc = await db.blogs.find_one_and_update({'id': blog_id}, {'$inc': {'likes': inc}})
    if not doc:
        raise HTTPException(404, 'Not found')
    new_likes = max(0, (doc.get('likes', 0) or 0) + inc)
    return {'likes': new_likes}

@api.get('/blogs/{blog_id}/comments')
async def get_comments(blog_id: str):
    doc = await db.blogs.find_one({'id': blog_id})
    if not doc:
        raise HTTPException(404, 'Not found')
    return doc.get('comments', [])

@api.post('/blogs/{blog_id}/comments')
async def add_comment(blog_id: str, body: CommentIn):
    c = Comment(name=body.name, text=body.text).dict()
    res = await db.blogs.update_one({'id': blog_id}, {'$push': {'comments': {'$each': [c], '$position': 0}}})
    if res.matched_count == 0:
        raise HTTPException(404, 'Not found')
    return c

@api.post('/blogs/{blog_id}/comments/{comment_id}/reply')
async def add_reply(blog_id: str, comment_id: str, body: CommentIn):
    r = Reply(name=body.name, text=body.text).dict()
    res = await db.blogs.update_one({'id': blog_id, 'comments.id': comment_id}, {'$push': {'comments.$.replies': r}})
    if res.matched_count == 0:
        raise HTTPException(404, 'Not found')
    return r

# ------------------------- Orders -------------------------
@api.post('/orders')
async def create_order(body: OrderIn):
    o = Order(**body.dict()).dict()
    await db.orders.insert_one(o)
    return clean(o)

@api.get('/orders')
async def list_orders(_: str = Depends(require_admin)):
    docs = await db.orders.find().sort('date', -1).to_list(1000)
    return cleans(docs)

@api.patch('/orders/{order_id}')
async def update_order(order_id: str, body: Dict[str, Any], _: str = Depends(require_admin)):
    await db.orders.update_one({'id': order_id}, {'$set': body})
    doc = await db.orders.find_one({'id': order_id})
    return clean(doc)

@api.delete('/orders/{order_id}')
async def delete_order(order_id: str, _: str = Depends(require_admin)):
    res = await db.orders.delete_one({'id': order_id})
    return {'deleted': res.deleted_count}

# ------------------------- Messages -------------------------
@api.post('/messages')
async def create_message(body: MessageIn):
    m = Message(**body.dict()).dict()
    await db.messages.insert_one(m)
    return clean(m)

@api.get('/messages')
async def list_messages(_: str = Depends(require_admin)):
    docs = await db.messages.find().sort('date', -1).to_list(1000)
    return cleans(docs)

@api.delete('/messages/{message_id}')
async def delete_message(message_id: str, _: str = Depends(require_admin)):
    res = await db.messages.delete_one({'id': message_id})
    return {'deleted': res.deleted_count}

# ------------------------- Stats -------------------------
@api.get('/admin/stats')
async def stats(_: str = Depends(require_admin)):
    counts = {}
    for c in ['skills', 'services', 'projects', 'testimonials', 'blogs', 'orders', 'messages']:
        counts[c] = await db[c].count_documents({})
    return counts

# ------------------------- Seed -------------------------
@api.post('/admin/seed')
async def seed(force: bool = False):
    # Seed admin if missing
    if not await db.admin.find_one({'username': 'aman'}):
        await db.admin.insert_one({'username': 'aman', 'password': hash_pw('craft2025')})

    # Seed profile if missing
    if force or not await db.profile.find_one({'_key': 'singleton'}):
        p = Profile(
            sub='I build modern, AI-powered web apps, renewal platforms, admin dashboards, and bespoke digital tools that help brands scale beyond the ordinary.',
            photo='https://images.unsplash.com/photo-1516202648085-f93e477d1300?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwzfHxkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwwfHx8YmxhY2t8MTc3NjU5NjI2N3ww&ixlib=rb-4.1.0&q=85'
        ).dict()
        p['_key'] = 'singleton'
        await db.profile.update_one({'_key': 'singleton'}, {'$set': p}, upsert=True)

    async def seed_collection(name, docs):
        if force:
            await db[name].delete_many({})
        if await db[name].count_documents({}) == 0:
            if docs:
                await db[name].insert_many(docs)

    skills = [
        Skill(name='HTML', level=98, category='Frontend', order=1).dict(),
        Skill(name='CSS', level=95, category='Frontend', order=2).dict(),
        Skill(name='JavaScript', level=93, category='Frontend', order=3).dict(),
        Skill(name='React', level=90, category='Frontend', order=4).dict(),
        Skill(name='Bootstrap', level=94, category='Frontend', order=5).dict(),
        Skill(name='PHP', level=95, category='Backend', order=6).dict(),
        Skill(name='MySQL', level=92, category='Database', order=7).dict(),
        Skill(name='MongoDB', level=85, category='Database', order=8).dict(),
    ]
    await seed_collection('skills', skills)

    service_data = [
        ('Custom Website Development', 'Hand-crafted, conversion-focused websites tailored to your brand.', 'Globe'),
        ('Full Stack Web Applications', 'End-to-end web apps built with React, PHP, Node & modern stacks.', 'Layers'),
        ('Admin Dashboards', 'Powerful admin panels with analytics, auth & role management.', 'LayoutDashboard'),
        ('AI Paragraph Maker Tools', 'AI-powered writing & content generation utilities.', 'Sparkles'),
        ('Keyword Research Tools', 'SEO suites that surface high-volume, low-competition keywords.', 'Search'),
        ('Renewal Websites', 'Automated SaaS renewal platforms with recurring billing flows.', 'RefreshCw'),
        ('Invoice Generator Systems', 'Complete invoice, quotation & billing management systems.', 'Receipt'),
        ('Branding Design', 'Logo, identity & guidelines that set your brand apart.', 'Palette'),
        ('Business Cards', 'Premium print-ready business card designs.', 'CreditCard'),
        ('Flyers', 'High-impact marketing flyers that convert.', 'FileImage'),
        ('Poster Maker', 'Bold, striking posters for campaigns & events.', 'Image'),
        ('Digital Solutions', 'Consulting + bespoke software for your operations.', 'Cpu'),
    ]
    services = [Service(title=t, desc=d, icon=i, order=idx + 1).dict() for idx, (t, d, i) in enumerate(service_data)]
    await seed_collection('services', services)

    projects = [
        Project(title='Online Newspaper Platform', category='Full Stack', tech=['PHP', 'MySQL', 'Bootstrap', 'jQuery'], summary='A complete digital newspaper with public reader UI, editor dashboard and admin panel for category, reporter and revenue management.', cover='https://images.unsplash.com/photo-1720962158813-29b66b8e23e1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwzfHx3ZWIlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MHx8fGJsYWNrfDE3NzY1OTYyNzh8MA&ixlib=rb-4.1.0&q=85', metrics=[Metric(k='2.1M', v='Monthly Reads'), Metric(k='340+', v='Articles'), Metric(k='18', v='Editors')], order=1).dict(),
        Project(title='Invoice Generator (User + Admin)', category='SaaS', tech=['React', 'PHP', 'MySQL', 'PDF Engine'], summary='SaaS-grade invoicing with GST, quotations, client portals, PDF export, recurring billing and analytics for business owners.', cover='https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBtb2NrdXB8ZW58MHx8fGJsYWNrfDE3NzY1OTYyNzJ8MA&ixlib=rb-4.1.0&q=85', metrics=[Metric(k='12k+', v='Invoices'), Metric(k='$2.4M', v='Processed'), Metric(k='99.9%', v='Uptime')], order=2).dict(),
        Project(title='Service Hub — Urban Company Style', category='Marketplace', tech=['React', 'Node', 'MongoDB', 'Stripe'], summary='On-demand home service marketplace connecting customers with vetted professionals across 40+ service categories.', cover='https://images.unsplash.com/photo-1540159453465-731d5a46060a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHx3ZWIlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MHx8fGJsYWNrfDE3NzY1OTYyNzh8MA&ixlib=rb-4.1.0&q=85', metrics=[Metric(k='40+', v='Categories'), Metric(k='5k+', v='Pros'), Metric(k='4.9★', v='Rating')], order=3).dict(),
        Project(title='Hotel Management System', category='Enterprise', tech=['PHP', 'MySQL', 'Bootstrap', 'Chart.js'], summary='End-to-end hotel operations — rooms, bookings, billing, housekeeping, F&B and multi-property analytics.', cover='https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MHx8fGJsYWNrfDE3NzY1OTYyNzh8MA&ixlib=rb-4.1.0&q=85', metrics=[Metric(k='120+', v='Rooms'), Metric(k='8', v='Properties'), Metric(k='−32%', v='Admin Time')], order=4).dict(),
    ]
    await seed_collection('projects', projects)

    testimonials = [
        Testimonial(name='Rohan Mehta', role='Founder, Kavach Labs', quote='Aman delivered a flawless admin dashboard ahead of schedule. The attention to detail is next level — every micro-interaction feels premium.').dict(),
        Testimonial(name='Priya Shah', role='Marketing Head, NovaCommerce', quote='We rebuilt our entire invoicing system with Aman. Conversion is up 28% and our finance team finally smiles on Mondays.').dict(),
        Testimonial(name='Arjun Iyer', role='CTO, StayNest Hotels', quote='The hotel management system handles 8 properties without breaking a sweat. Clean code, clean UI, clean communication.').dict(),
        Testimonial(name='Sara Kapoor', role='Editor, DailyPulse', quote='Our newspaper platform is now a joy to publish on. Readers notice the speed. A rare developer who cares about craft.').dict(),
    ]
    await seed_collection('testimonials', testimonials)

    blogs = [
        BlogPost(slug='building-premium-dashboards', title='Building Premium Admin Dashboards in 2025', excerpt='A deep dive into motion, density and state design for truly premium admin UIs.', content='Premium dashboards balance information density with cinematic motion. In this post we explore the golden ratio of padding, the role of micro-charts, and why every production dashboard needs a command palette. We also cover how to structure color tokens so themes can be swapped without regressions, and how to push 60fps scroll performance even on massive tables.', cover='https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxjb2RlJTIwYWJzdHJhY3R8ZW58MHx8fGJsYWNrfDE3NzY1OTYyODF8MA&ixlib=rb-4.1.0&q=85', date='2025-06-14', tag='Design Systems', read='8 min', likes=142).dict(),
        BlogPost(slug='php-react-hybrid-stack', title='Why a PHP + React Hybrid Stack Still Wins', excerpt='Pragmatic stacks ship revenue. Here is how I combine legacy PHP APIs with a React front.', content='Legacy PHP codebases drive billions in revenue. Rewriting them is career suicide. Instead, I incrementally front them with a React shell connected via clean REST endpoints. You get the speed of a modern SPA with the stability of tried-and-tested business logic.', cover='https://images.pexels.com/photos/6190327/pexels-photo-6190327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', date='2025-05-02', tag='Architecture', read='6 min', likes=98).dict(),
        BlogPost(slug='ai-writing-tools-that-dont-suck', title="AI Writing Tools That Actually Don't Suck", excerpt='Going beyond ChatGPT wrappers — building AI tools people pay for monthly.', content='Most AI writing tools are thin wrappers. The ones that actually retain users share three traits: deep niche focus, tight editor UX, and smart defaults that remove prompt engineering from the user.', cover='https://images.pexels.com/photos/34804021/pexels-photo-34804021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', date='2025-04-18', tag='AI Products', read='10 min', likes=211).dict(),
    ]
    await seed_collection('blogs', blogs)

    return {'status': 'ok', 'seeded': True}

# ------------------------- Health -------------------------
@api.get('/')
async def root():
    return {'message': 'Aman Web Craft API', 'version': '1.0'}

app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event('startup')
async def startup():
    try:
        await seed()
        logger.info('Seeded defaults (or verified existing).')
    except Exception as e:
        logger.exception('Seed failed: %s', e)

@app.on_event('shutdown')
async def shutdown():
    client.close()
