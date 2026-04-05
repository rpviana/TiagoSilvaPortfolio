--
-- PostgreSQL database dump
--

\restrict bKIgxkNjN49RorgIY4QGiIjC7XI4BtuxooUxVdHfwQ8xzvHWIk8rRrYeeX75t4E

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-05 01:28:28

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 65771)
-- Name: discography; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discography (
    id integer NOT NULL,
    title text NOT NULL,
    year integer NOT NULL,
    label text,
    cover_image text,
    spotify_url text,
    apple_music_url text,
    amazon_url text
);


ALTER TABLE public.discography OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 65770)
-- Name: discography_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discography_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.discography_id_seq OWNER TO postgres;

--
-- TOC entry 5154 (class 0 OID 0)
-- Dependencies: 219
-- Name: discography_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discography_id_seq OWNED BY public.discography.id;


--
-- TOC entry 222 (class 1259 OID 65783)
-- Name: discography_review_translations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discography_review_translations (
    id integer NOT NULL,
    review_id integer NOT NULL,
    language_code character varying(2) NOT NULL,
    reviewer_name text NOT NULL,
    review_text text NOT NULL
);


ALTER TABLE public.discography_review_translations OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 65782)
-- Name: discography_review_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discography_review_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.discography_review_translations_id_seq OWNER TO postgres;

--
-- TOC entry 5155 (class 0 OID 0)
-- Dependencies: 221
-- Name: discography_review_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discography_review_translations_id_seq OWNED BY public.discography_review_translations.id;


--
-- TOC entry 224 (class 1259 OID 65799)
-- Name: discography_reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discography_reviews (
    id integer NOT NULL,
    discography_id integer NOT NULL,
    reviewer_nif text NOT NULL,
    rating integer,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.discography_reviews OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 65798)
-- Name: discography_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discography_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.discography_reviews_id_seq OWNER TO postgres;

--
-- TOC entry 5156 (class 0 OID 0)
-- Dependencies: 223
-- Name: discography_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discography_reviews_id_seq OWNED BY public.discography_reviews.id;


--
-- TOC entry 226 (class 1259 OID 65814)
-- Name: event_translations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_translations (
    id integer NOT NULL,
    event_id integer NOT NULL,
    language_code character varying(2) NOT NULL,
    title text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.event_translations OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 65813)
-- Name: event_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_translations_id_seq OWNER TO postgres;

--
-- TOC entry 5157 (class 0 OID 0)
-- Dependencies: 225
-- Name: event_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_translations_id_seq OWNED BY public.event_translations.id;


--
-- TOC entry 228 (class 1259 OID 65830)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    "time" text NOT NULL,
    venue text NOT NULL,
    is_past boolean DEFAULT false,
    booking_link text,
    program_link text
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 65829)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- TOC entry 5158 (class 0 OID 0)
-- Dependencies: 227
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- TOC entry 229 (class 1259 OID 65843)
-- Name: languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.languages (
    code character varying(2) NOT NULL,
    name text NOT NULL,
    is_default boolean DEFAULT false
);


ALTER TABLE public.languages OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 65854)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 65853)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 5159 (class 0 OID 0)
-- Dependencies: 230
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 233 (class 1259 OID 65869)
-- Name: repertoire; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.repertoire (
    id integer NOT NULL,
    composer text NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.repertoire OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 65881)
-- Name: repertoire_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.repertoire_categories (
    id integer NOT NULL,
    slug text NOT NULL
);


ALTER TABLE public.repertoire_categories OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 65880)
-- Name: repertoire_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.repertoire_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.repertoire_categories_id_seq OWNER TO postgres;

--
-- TOC entry 5160 (class 0 OID 0)
-- Dependencies: 234
-- Name: repertoire_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.repertoire_categories_id_seq OWNED BY public.repertoire_categories.id;


--
-- TOC entry 237 (class 1259 OID 65894)
-- Name: repertoire_category_translations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.repertoire_category_translations (
    id integer NOT NULL,
    category_id integer NOT NULL,
    language_code character varying(2) NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.repertoire_category_translations OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 65893)
-- Name: repertoire_category_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.repertoire_category_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.repertoire_category_translations_id_seq OWNER TO postgres;

--
-- TOC entry 5161 (class 0 OID 0)
-- Dependencies: 236
-- Name: repertoire_category_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.repertoire_category_translations_id_seq OWNED BY public.repertoire_category_translations.id;


--
-- TOC entry 232 (class 1259 OID 65868)
-- Name: repertoire_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.repertoire_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.repertoire_id_seq OWNER TO postgres;

--
-- TOC entry 5162 (class 0 OID 0)
-- Dependencies: 232
-- Name: repertoire_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.repertoire_id_seq OWNED BY public.repertoire.id;


--
-- TOC entry 239 (class 1259 OID 65909)
-- Name: repertoire_translations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.repertoire_translations (
    id integer NOT NULL,
    repertoire_id integer NOT NULL,
    language_code character varying(2) NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.repertoire_translations OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 65908)
-- Name: repertoire_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.repertoire_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.repertoire_translations_id_seq OWNER TO postgres;

--
-- TOC entry 5163 (class 0 OID 0)
-- Dependencies: 238
-- Name: repertoire_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.repertoire_translations_id_seq OWNED BY public.repertoire_translations.id;


--
-- TOC entry 242 (class 1259 OID 65991)
-- Name: site_content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.site_content (
    key text NOT NULL,
    value_pt text NOT NULL,
    value_en text NOT NULL,
    type text DEFAULT 'text'::text NOT NULL,
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.site_content OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 65924)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    first_name text,
    last_name text,
    is_admin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 65923)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5164 (class 0 OID 0)
-- Dependencies: 240
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4914 (class 2604 OID 65774)
-- Name: discography id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discography ALTER COLUMN id SET DEFAULT nextval('public.discography_id_seq'::regclass);


--
-- TOC entry 4915 (class 2604 OID 65786)
-- Name: discography_review_translations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discography_review_translations ALTER COLUMN id SET DEFAULT nextval('public.discography_review_translations_id_seq'::regclass);


--
-- TOC entry 4916 (class 2604 OID 65802)
-- Name: discography_reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discography_reviews ALTER COLUMN id SET DEFAULT nextval('public.discography_reviews_id_seq'::regclass);


--
-- TOC entry 4918 (class 2604 OID 65817)
-- Name: event_translations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_translations ALTER COLUMN id SET DEFAULT nextval('public.event_translations_id_seq'::regclass);


--
-- TOC entry 4919 (class 2604 OID 65833)
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- TOC entry 4922 (class 2604 OID 65857)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 4924 (class 2604 OID 65872)
-- Name: repertoire id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire ALTER COLUMN id SET DEFAULT nextval('public.repertoire_id_seq'::regclass);


--
-- TOC entry 4925 (class 2604 OID 65884)
-- Name: repertoire_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_categories ALTER COLUMN id SET DEFAULT nextval('public.repertoire_categories_id_seq'::regclass);


--
-- TOC entry 4926 (class 2604 OID 65897)
-- Name: repertoire_category_translations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_category_translations ALTER COLUMN id SET DEFAULT nextval('public.repertoire_category_translations_id_seq'::regclass);


--
-- TOC entry 4927 (class 2604 OID 65912)
-- Name: repertoire_translations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_translations ALTER COLUMN id SET DEFAULT nextval('public.repertoire_translations_id_seq'::regclass);


--
-- TOC entry 4928 (class 2604 OID 65927)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5126 (class 0 OID 65771)
-- Dependencies: 220
-- Data for Name: discography; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discography (id, title, year, label, cover_image, spotify_url, apple_music_url, amazon_url) FROM stdin;
\.


--
-- TOC entry 5128 (class 0 OID 65783)
-- Dependencies: 222
-- Data for Name: discography_review_translations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discography_review_translations (id, review_id, language_code, reviewer_name, review_text) FROM stdin;
\.


--
-- TOC entry 5130 (class 0 OID 65799)
-- Dependencies: 224
-- Data for Name: discography_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discography_reviews (id, discography_id, reviewer_nif, rating, created_at) FROM stdin;
\.


--
-- TOC entry 5132 (class 0 OID 65814)
-- Dependencies: 226
-- Data for Name: event_translations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_translations (id, event_id, language_code, title, description) FROM stdin;
3	1	pt	teste	testeteste
4	1	en	test	testtest
\.


--
-- TOC entry 5134 (class 0 OID 65830)
-- Dependencies: 228
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, date, "time", venue, is_past, booking_link, program_link) FROM stdin;
1	2026-04-05 00:24:00	1:24 AM	TESTE	f	teste.com	teste.com
\.


--
-- TOC entry 5135 (class 0 OID 65843)
-- Dependencies: 229
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.languages (code, name, is_default) FROM stdin;
en	English	t
pt	Português	f
\.


--
-- TOC entry 5137 (class 0 OID 65854)
-- Dependencies: 231
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, name, email, subject, message, created_at) FROM stdin;
\.


--
-- TOC entry 5139 (class 0 OID 65869)
-- Dependencies: 233
-- Data for Name: repertoire; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.repertoire (id, composer, category_id) FROM stdin;
\.


--
-- TOC entry 5141 (class 0 OID 65881)
-- Dependencies: 235
-- Data for Name: repertoire_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.repertoire_categories (id, slug) FROM stdin;
\.


--
-- TOC entry 5143 (class 0 OID 65894)
-- Dependencies: 237
-- Data for Name: repertoire_category_translations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.repertoire_category_translations (id, category_id, language_code, name) FROM stdin;
\.


--
-- TOC entry 5145 (class 0 OID 65909)
-- Dependencies: 239
-- Data for Name: repertoire_translations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.repertoire_translations (id, repertoire_id, language_code, title) FROM stdin;
\.


--
-- TOC entry 5148 (class 0 OID 65991)
-- Dependencies: 242
-- Data for Name: site_content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.site_content (key, value_pt, value_en, type, updated_at) FROM stdin;
header_nav_contact	Contacto	Contact	text	2026-04-04 23:56:07.588
footer_whatsapp_url	https://wa.me/447784730680	https://wa.me/447784730680	url	2026-04-04 23:56:07.59
header_nav_gallery	Galeria	Gallery	text	2026-04-04 23:56:07.591
header_nav_about	Sobre	About	text	2026-04-04 23:56:07.58
footer_youtube_url	https://www.youtube.com/@tiagosoaressilva7056	https://www.youtube.com/@tiagosoaressilva7056	url	2026-04-04 23:56:07.592
home_about_p2	Com apresentações em renomadas salas de concerto e festivais, Tiago estabeleceu-se como um intérprete cativante cujas performances fascinam pela profundidade emocional e abordagem ponderada da narrativa musical.	With appearances at renowned concert halls and festivals, Tiago has established himself as a compelling interpreter whose performances captivate through their emotional depth and thoughtful approach to musical storytelling.	textarea	2026-04-04 23:56:07.581
footer_phone	+44 (0) 778 473 0680	+44 (0) 778 473 0680	text	2026-04-04 23:56:07.582
header_bg_color	#ffffff	#ffffff	color	2026-04-04 23:56:07.583
footer_email	tiagosilva.05.2000@gmail.com	tiagosilva.05.2000@gmail.com	text	2026-04-04 23:56:07.586
header_nav_discography	Discografia	Discography	text	2026-04-04 23:56:07.587
header_text_color	#6B2D3A	#6B2D3A	color	2026-04-04 23:56:07.593
home_hero_subtitle	Violinista	Violinist	text	2026-04-04 23:56:07.601
home_about_p1	O violinista Tiago Soares Silva é um intérprete versátil dedicado a apresentar tanto o repertório tradicional quanto a música contemporânea para plateias em todo o mundo. Sua visão artística combina excelência técnica com profunda expressão musical.	Violinist Tiago Soares Silva is a versatile performer dedicated to presenting both traditional repertoire and contemporary music to audiences worldwide. His artistic vision combines technical excellence with profound musical expression.	textarea	2026-04-04 23:56:07.587
home_hero_cta_color	#6B2D3A	#6B2D3A	color	2026-04-04 23:56:07.601
header_nav_events	Agenda	Events	text	2026-04-04 23:56:07.602
footer_title	Tiago Soares Silva	Tiago Soares Silva	text	2026-04-04 23:56:07.588
footer_description	Violinista profissional dedicado à música clássica e contemporânea, partilhando a beleza da música através de performances memoráveis.	Professional violinist dedicated to classical and contemporary music, sharing the beauty of music through memorable performances.	textarea	2026-04-04 23:56:07.602
footer_text_secondary_color	#9CA3AF	#9CA3AF	color	2026-04-04 23:56:07.603
about_title	Sobre	About	text	2026-04-04 23:56:07.603
about_image	/attached_assets/Tiago-Violino-52.JPG	/attached_assets/Tiago-Violino-52.JPG	image	2026-04-04 23:56:07.604
footer_facebook_url	https://www.facebook.com/tiago.soaressilva.arts	https://www.facebook.com/tiago.soaressilva.arts	url	2026-04-04 23:56:07.606
footer_text_color	#ffffff	#ffffff	color	2026-04-04 23:56:07.593
home_about_image	/attached_assets/Tiago-Violino-68.JPG	/attached_assets/Tiago-Violino-68.JPG	image	2026-04-04 23:56:07.593
home_hero_title	Tiago Soares Silva	Tiago Soares Silva	text	2026-04-04 23:56:07.595
about_short_title	Biografia Curta	Short Biography	text	2026-04-04 23:56:07.605
about_short_p1	Artista Futuro do Southbank Centre e Britten Pears Young Artist, Tiago Soares Silva apresentou-se recentemente em salas como Wigmore Hall, Queens Hall Edinburgh, Southbank Centre, Stamford International Festival, Aldeburgh Festival, Lerici Music Festival, St. James's Piccadilly, Petworth Chamber Music Festival, Linbury Theatre no Royal Opera House, Fidelio Café e Ferrandou Musique.	A Southbank Centre Future Artist and Britten Pears Young Artist, Tiago Soares Silva's recent appearances include Wigmore Hall, Queens Hall Edinburgh, Southbank Centre, Stamford International Festival, Aldeburgh Festival, Lerici Music Festival, St. James's Piccadilly, Petworth Chamber Music Festival, Linbury Theatre at the Royal Opera House, Fidelio Café, and Ferrandou Musique.	textarea	2026-04-04 23:56:07.606
header_logo_text	Tiago Soares Silva	Tiago Soares Silva	text	2026-04-04 23:56:07.595
footer_copyright	Todos os direitos reservados.	All rights reserved.	text	2026-04-04 23:56:07.576
footer_bg_color	#111827	#111827	color	2026-04-04 23:56:07.577
home_hero_cta_text	Agendar uma Apresentação	Book a Performance	text	2026-04-04 23:56:07.596
test_key	Valor PT	Value EN	text	2026-04-04 23:56:07.596
home_hero_image	/attached_assets/Tiago-Violino-87.JPG	/attached_assets/Tiago-Violino-87.JPG	image	2026-04-04 23:56:07.579
footer_instagram_url	https://www.instagram.com/tiagosilva_violin/	https://www.instagram.com/tiagosilva_violin/	url	2026-04-04 23:56:07.597
footer_linkedin_url	https://www.linkedin.com/in/tiago-soares-silva-violin	https://www.linkedin.com/in/tiago-soares-silva-violin	url	2026-04-04 23:56:07.598
header_nav_projects	Projetos	Projects	text	2026-04-04 23:56:07.599
home_about_quote	A música não é o que eu faço, é quem eu sou.	Music is not what I do, it is who I am.	textarea	2026-04-04 23:56:07.6
about_short_p2	É artista de gravação da Luminate Records, tendo lançado um EP do Quarteto de Cordas nº1 "Eclipse" de Brett Dean. Gravou também "Ceilidh" de Justin Connolly para a Divine Records, integrado num álbum duplo dedicado à música do compositor, aclamado por publicações como a Gramophone, a British Music Society e a Classical Music Daily.	He is a recording artist with Luminate Records, releasing an EP of Brett Dean's String Quartet No.1 "Eclipse". He has also recorded Justin Connolly's Ceilidh for Divine Records, part of a landmark double-album dedicated to Justin Connolly's music, reviewed by Gramophone, British Music Society, and Classical Music Daily.	textarea	2026-04-04 23:56:07.607
about_short_p3	Tiago é membro fundador do 97 Ensemble, colaborando com organizações como a Amnistia Internacional e a Solace Women's Aid. É igualmente Vice-Presidente da FAMART – Associação Cultural, que promove eventos culturais no norte rural de Portugal.	Tiago is a founding member of the 97 Ensemble, collaborating with charities such as Amnesty International and Solace Women's Aid. He is also Vice-President of FAMART – Cultural Association, bringing cultural events throughout the northern countryside regions of Portugal.	textarea	2026-04-04 23:56:07.607
about_full_title	Biografia Completa	Full Biography	text	2026-04-04 23:56:07.608
about_full_p1	Artista Britten Pears Young Artist e Southbank Centre Future Artist, Tiago Soares Silva apresentou-se por toda a Europa como solista e músico de câmara. Entre as suas atuações recentes contam-se o Wigmore Hall, Queens' Hall Edinburgh, Southbank Centre, Linbury Theatre no Royal Opera House, Aldeburgh Festival, Snape Maltings, Petworth Festival, Ferrandou Musique, Lerici Festival, Elgar Room e Fidelio Café.	A Britten Pears Young Artist and Southbank Centre Future Artist, Tiago Soares Silva has performed throughout Europe as a chamber musician and soloist. Recent appearances include Wigmore Hall, Queens' Hall Edinburgh, Southbank Centre, Linbury Theatre at the Royal Opera House, Aldeburgh Festival, Snape Maltings, Petworth Festival, Ferrandou Musique, Lerici Festival, Elgar Room and Fidelio Café.	textarea	2026-04-04 23:56:07.608
about_full_p2	Lançou recentemente, com o Slate Quartet, um EP para a Luminate Records com o Quarteto de Cordas nº1 "Eclipse" de Brett Dean. Gravou também "Ceilidh" de Justin Connolly para quatro violinos, com membros do Kreutzer Quartet e Muriel Oberhofer, integrado num álbum duplo editado pela Divine Records, elogiado pela Gramophone, British Music Society e Classical Music Daily.	He has recently released, with the Slate Quartet, an EP for Luminate Records of Brett Dean's String Quartet No. 1 "Eclipse". He has also recorded Justin Connolly's Ceilidh for four violins with members of the Kreutzer Quartet and Muriel Oberhofer, as part of a Double-Album through Divine Records, favourably reviewed by Gramophone, British Music Society, and Classical Music Daily.	textarea	2026-04-04 23:56:07.609
about_full_p6	No percurso académico, recebeu distinções como o Prémio de Excelência Santander Totta, o Prémio Doutora Manuela Carvalho, o Prémio da Fundação Padre Simão Rodrigues, o Help Musicians Postgraduate Award e o Stephen Bell Charitable Trust.	Academically, Tiago has been a recipient of several prizes including the Santander Totta's Excellence Prize, Doctor Manuela Carvalho Prize, Padre Simão Rodrigues Foundation Prize, Help Musicians Postgraduate Award, and the Stephen Bell Charitable Trust.	textarea	2026-04-04 23:56:07.609
about_short_p4	É licenciado com distinção pelo Royal College of Music e antigo bolseiro de pós-graduação da Royal Academy of Music. Atualmente frequenta o Advanced Postgraduate Diploma no Royal Birmingham Conservatoire, sob orientação de Roman Mints e com o apoio da Headley Trust, tocando num violino Gioffredo Cappa de cerca de 1710, gentilmente cedido pela Royal Academy of Music.	He is a First Class Honours graduate of the Royal College of Music, and a former postgraduate and scholar at the Royal Academy of Music. Currently, he is an Advanced Postgraduate Diploma student of Roman Mints at the Royal Birmingham Conservatoire, supported by the Headley Trust, performing on a circa 1710 Gioffredo Cappa violin kindly on loan by the Royal Academy of Music.	textarea	2026-04-04 23:56:07.613
about_full_p7	Foi bolseiro de pós-graduação da Royal Academy of Music e licenciou-se com distinção pelo Royal College of Music. Atualmente frequenta o Advanced Postgraduate Diploma no Royal Birmingham Conservatoire, apoiado pela Headley Trust. Toca num violino Gioffredo Cappa de cerca de 1710 e um arco Hill, ambos gentilmente cedidos pela Royal Academy of Music.	He is a former postgraduate student and scholar at the Royal Academy of Music, and a First Class Honours graduate of the Royal College of Music. Currently, he is pursuing the Advanced Postgraduate Diploma at the Royal Birmingham Conservatoire, supported by the Headley Trust. He performs on a circa 1710 Gioffredo Cappa violin, and a Hill bow, both kindly on loan by the Royal Academy of Music.	textarea	2026-04-04 23:56:07.614
about_text_color	#374151	#374151	color	2026-04-04 23:56:07.615
about_button_color	#6B2D3A	#6B2D3A	color	2026-04-04 23:56:07.615
about_bg_color	#ffffff	#ffffff	color	2026-04-04 23:56:07.609
about_title_color	#6B2D3A	#6B2D3A	color	2026-04-04 23:56:07.61
about_full_p4	É membro fundador do Slate Quartet e do 97 Ensemble, este último dedicado à promoção do repertório de compositoras e à colaboração com instituições como a Amnistia Internacional e a Solace Women's Aid. Tiago é também fundador e Vice-Presidente da FAMART – Associação Cultural, que leva eventos artísticos ao norte de Portugal, criando oportunidades para jovens músicos portugueses através de masterclasses, concertos, workshops, gravações profissionais e projetos comunitários como "Raízes".	He is a founding member of the Slate Quartet and the 97 Ensemble, the latter championing female composers' repertoire and collaborating with charities such as Amnesty International and Solace Women's Aid. Tiago is also a founder and Vice-President of FAMART, a cultural association bringing artistic events to northern Portugal, creating opportunities for young Portuguese artists through masterclasses, concerts, workshops, recordings, and community projects such as "Raízes".	textarea	2026-04-04 23:56:07.611
about_full_p3	Colaborou com artistas de renome internacional como James Ehnes, Jo Knight, Jack Liebeck, Merel Vercammen, Hee-Young Lim, Oliver Heath, Elliot Perks, Jordan Ashman e Elly Suh. Como intérprete de música contemporânea, estreou obras de Sarah Angliss, Erland Cooper, Sasha Scott, Marcello Palazzo, Philip Dutton, Rockey Sun Keting, Beatrice Ferreira e Marcus Rock.	Tiago has collaborated with internationally-renowned artists such as James Ehnes, Jo Knight, Jack Liebeck, Merel Vercammen, Hee-Young Lim, Oliver Heath, Elliot Perks, Jordan Ashman, and Elly Suh. As a contemporary artist, he has premiered works by Sarah Angliss, Erland Cooper, Sasha Scott, Marcello Palazzo, Philip Dutton, Rockey Sun Keting, Beatrice Ferreira, and Marcus Rock.	textarea	2026-04-04 23:56:07.612
about_cv_pt	/cv-pt.pdf	/cv-pt.pdf	file	2026-04-04 23:56:07.615
about_small_bio_pt	/Tiago_PequenaBiografia_pt.pdf	/Tiago_PequenaBiografia_pt.pdf	file	2026-04-04 23:56:07.616
about_full_bio_pt	/Tiago_BiografiaCompleta_pt.pdf	/Tiago_BiografiaCompleta_pt.pdf	file	2026-04-04 23:56:07.617
about_cv_en	/cv-en.pdf	/cv-en.pdf	file	2026-04-04 23:56:07.617
about_small_bio_en	/Tiago_SmallBiography_en.pdf	/Tiago_SmallBiography_en.pdf	file	2026-04-04 23:56:07.618
about_full_bio_en	/Tiago_FullBiography_en.pdf	/Tiago_FullBiography_en.pdf	file	2026-04-04 23:56:07.619
about_cv_label	Baixar CV	Download CV	text	2026-04-04 23:56:07.62
about_bio_label	Baixar Bio (PDF)	Download Bio (PDF)	text	2026-04-04 23:56:07.621
about_full_p5	Foi premiado em vários concursos e festivais nacionais e internacionais, entre eles o Concurso Internacional de Violino de Guimarães (2.º prémio), Concurso Internacional Paços Premium (2.º prémio), Prémio Luso-Galaico "Elisa de Sousa Pedroso" (1.º prémio), Concurso Nacional Vasco Barbosa (3.º prémio), Classical Summer Festival Lisboa (2.º prémio) e o Festival Peter de Grote, Groningen (Prémio Honorário de Excelência Musical).	He has been a prize winner in several national and international competitions, such as Guimarães International Violin Competition (2nd prize), Paços Premium International Competition (2nd prize), Elisa de Sousa Pedroso Luso-Galician Prize (1st prize), Vasco Barbosa National String Competition (3rd prize), Classical Summer Festival Lisbon (2nd prize), and the Peter de Grote Festival Groningen (Honorary Award for Outstanding Musicianship).	textarea	2026-04-04 23:56:07.621
\.


--
-- TOC entry 5147 (class 0 OID 65924)
-- Dependencies: 241
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, first_name, last_name, is_admin, created_at, updated_at) FROM stdin;
1	teste@exemplo.com	$2b$10$70YWrWDMKuDwaD.lQB8s0eJ4GaCHNZdkyPMB5Oz3NdtgBWZ1v5Wlq	Tiago	Silva	t	2026-04-03 01:11:25.081137	2026-04-03 01:11:25.081137
\.


--
-- TOC entry 5165 (class 0 OID 0)
-- Dependencies: 219
-- Name: discography_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.discography_id_seq', 1, false);


--
-- TOC entry 5166 (class 0 OID 0)
-- Dependencies: 221
-- Name: discography_review_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.discography_review_translations_id_seq', 1, false);


--
-- TOC entry 5167 (class 0 OID 0)
-- Dependencies: 223
-- Name: discography_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.discography_reviews_id_seq', 1, false);


--
-- TOC entry 5168 (class 0 OID 0)
-- Dependencies: 225
-- Name: event_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_translations_id_seq', 4, true);


--
-- TOC entry 5169 (class 0 OID 0)
-- Dependencies: 227
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 1, true);


--
-- TOC entry 5170 (class 0 OID 0)
-- Dependencies: 230
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- TOC entry 5171 (class 0 OID 0)
-- Dependencies: 234
-- Name: repertoire_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.repertoire_categories_id_seq', 1, false);


--
-- TOC entry 5172 (class 0 OID 0)
-- Dependencies: 236
-- Name: repertoire_category_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.repertoire_category_translations_id_seq', 1, false);


--
-- TOC entry 5173 (class 0 OID 0)
-- Dependencies: 232
-- Name: repertoire_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.repertoire_id_seq', 1, false);


--
-- TOC entry 5174 (class 0 OID 0)
-- Dependencies: 238
-- Name: repertoire_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.repertoire_translations_id_seq', 1, false);


--
-- TOC entry 5175 (class 0 OID 0)
-- Dependencies: 240
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 4935 (class 2606 OID 65781)
-- Name: discography discography_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discography
    ADD CONSTRAINT discography_pkey PRIMARY KEY (id);


--
-- TOC entry 4937 (class 2606 OID 65795)
-- Name: discography_review_translations discography_review_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discography_review_translations
    ADD CONSTRAINT discography_review_translations_pkey PRIMARY KEY (id);


--
-- TOC entry 4939 (class 2606 OID 65797)
-- Name: discography_review_translations discography_review_translations_review_id_language_code_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discography_review_translations
    ADD CONSTRAINT discography_review_translations_review_id_language_code_unique UNIQUE (review_id, language_code);


--
-- TOC entry 4941 (class 2606 OID 65810)
-- Name: discography_reviews discography_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discography_reviews
    ADD CONSTRAINT discography_reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4943 (class 2606 OID 65826)
-- Name: event_translations event_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_translations
    ADD CONSTRAINT event_translations_pkey PRIMARY KEY (id);


--
-- TOC entry 4945 (class 2606 OID 65842)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 4947 (class 2606 OID 65852)
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (code);


--
-- TOC entry 4949 (class 2606 OID 65867)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 4953 (class 2606 OID 65890)
-- Name: repertoire_categories repertoire_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_categories
    ADD CONSTRAINT repertoire_categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4955 (class 2606 OID 65892)
-- Name: repertoire_categories repertoire_categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_categories
    ADD CONSTRAINT repertoire_categories_slug_unique UNIQUE (slug);


--
-- TOC entry 4957 (class 2606 OID 65905)
-- Name: repertoire_category_translations repertoire_category_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_category_translations
    ADD CONSTRAINT repertoire_category_translations_pkey PRIMARY KEY (id);


--
-- TOC entry 4951 (class 2606 OID 65879)
-- Name: repertoire repertoire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire
    ADD CONSTRAINT repertoire_pkey PRIMARY KEY (id);


--
-- TOC entry 4959 (class 2606 OID 65920)
-- Name: repertoire_translations repertoire_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_translations
    ADD CONSTRAINT repertoire_translations_pkey PRIMARY KEY (id);


--
-- TOC entry 4961 (class 2606 OID 65922)
-- Name: repertoire_translations repertoire_translations_repertoire_id_language_code_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_translations
    ADD CONSTRAINT repertoire_translations_repertoire_id_language_code_unique UNIQUE (repertoire_id, language_code);


--
-- TOC entry 4967 (class 2606 OID 66003)
-- Name: site_content site_content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_content
    ADD CONSTRAINT site_content_pkey PRIMARY KEY (key);


--
-- TOC entry 4963 (class 2606 OID 65939)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 4965 (class 2606 OID 65937)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4968 (class 2606 OID 65945)
-- Name: discography_review_translations discography_review_translations_language_code_languages_code_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discography_review_translations
    ADD CONSTRAINT discography_review_translations_language_code_languages_code_fk FOREIGN KEY (language_code) REFERENCES public.languages(code);


--
-- TOC entry 4969 (class 2606 OID 65940)
-- Name: discography_review_translations discography_review_translations_review_id_discography_reviews_i; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discography_review_translations
    ADD CONSTRAINT discography_review_translations_review_id_discography_reviews_i FOREIGN KEY (review_id) REFERENCES public.discography_reviews(id) ON DELETE CASCADE;


--
-- TOC entry 4970 (class 2606 OID 65950)
-- Name: discography_reviews discography_reviews_discography_id_discography_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discography_reviews
    ADD CONSTRAINT discography_reviews_discography_id_discography_id_fk FOREIGN KEY (discography_id) REFERENCES public.discography(id) ON DELETE CASCADE;


--
-- TOC entry 4971 (class 2606 OID 65955)
-- Name: event_translations event_translations_event_id_events_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_translations
    ADD CONSTRAINT event_translations_event_id_events_id_fk FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- TOC entry 4972 (class 2606 OID 65960)
-- Name: event_translations event_translations_language_code_languages_code_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_translations
    ADD CONSTRAINT event_translations_language_code_languages_code_fk FOREIGN KEY (language_code) REFERENCES public.languages(code);


--
-- TOC entry 4973 (class 2606 OID 65965)
-- Name: repertoire repertoire_category_id_repertoire_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire
    ADD CONSTRAINT repertoire_category_id_repertoire_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.repertoire_categories(id);


--
-- TOC entry 4974 (class 2606 OID 65970)
-- Name: repertoire_category_translations repertoire_category_translations_category_id_repertoire_categor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_category_translations
    ADD CONSTRAINT repertoire_category_translations_category_id_repertoire_categor FOREIGN KEY (category_id) REFERENCES public.repertoire_categories(id) ON DELETE CASCADE;


--
-- TOC entry 4975 (class 2606 OID 65975)
-- Name: repertoire_category_translations repertoire_category_translations_language_code_languages_code_f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_category_translations
    ADD CONSTRAINT repertoire_category_translations_language_code_languages_code_f FOREIGN KEY (language_code) REFERENCES public.languages(code);


--
-- TOC entry 4976 (class 2606 OID 65985)
-- Name: repertoire_translations repertoire_translations_language_code_languages_code_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_translations
    ADD CONSTRAINT repertoire_translations_language_code_languages_code_fk FOREIGN KEY (language_code) REFERENCES public.languages(code);


--
-- TOC entry 4977 (class 2606 OID 65980)
-- Name: repertoire_translations repertoire_translations_repertoire_id_repertoire_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repertoire_translations
    ADD CONSTRAINT repertoire_translations_repertoire_id_repertoire_id_fk FOREIGN KEY (repertoire_id) REFERENCES public.repertoire(id) ON DELETE CASCADE;


-- Completed on 2026-04-05 01:28:28

--
-- PostgreSQL database dump complete
--

\unrestrict bKIgxkNjN49RorgIY4QGiIjC7XI4BtuxooUxVdHfwQ8xzvHWIk8rRrYeeX75t4E

