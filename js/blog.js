/* ============================================================
 * 博客公共脚本
 * 1. 站点信息集中配置
 * 2. 文章列表数据集中维护（新增文章时在 POSTS 中加一条）
 * 3. 自动渲染文章列表、页脚年份、导航高亮
 * ============================================================ */

// ---------- 站点配置（可直接修改） ----------
const SITE = {
  name: 'rinshaoshu',
  author: '林诚松',
  startYear: 2019,
  url: 'https://rinshaoshu.github.io',
  github: 'https://github.com/rinshaoshu',
  email: 'rinshaoshu@163.com',
  nav: [
    { text: 'Blog', href: '/posts/' },
    { text: 'About', href: '/about/' }
  ]
};

// ---------- 文章列表（按日期倒序，最新的在最上面） ----------
// 新增文章：在最上面加一条，并新建 posts/<slug>/index.html
const POSTS = [
  {
    slug: 'speak-it-clearly',
    title: '当我感到不安时，我会逼自己把话说清楚',
    date: '2026-10-05',
    category: '随笔',
    tags: ['情绪', '自我对话', '语言']
  },
  {
    slug: 'paper-rss-wenchuan',
    title: '论文阅读记录：Estimating weakening on hillslopes caused by strong earthquakes',
    date: '2026-09-30',
    category: '论文阅读',
    tags: ['地震滑坡', '剪切强度', '蒙特卡洛']
  },
  {
    slug: 'vietoris-rips',
    title: '从零开始理解 Vietoris–Rips 复形：用拓扑看数据的形状',
    date: '2026-09-30',
    category: '技术',
    tags: ['TDA', '拓扑数据分析', '持续同调']
  },
  {
    slug: 'hoek-brown',
    title: '从零理解 Hoek–Brown：不仅记住公式，更理解它为什么这样写',
    date: '2026-09-29',
    category: '技术',
    tags: ['地质工程', '岩体力学', 'Hoek–Brown']
  },
  {
    slug: 'article-dl',
    title: '多模态遥感动态融合的理论与模型',
    date: '2026-07-21',
    category: '技术',
    tags: ['多模态融合', '遥感', '土地覆盖分类']
  },
  {
    slug: 'second-post',
    title: '深度学习基础概念速览',
    date: '2026-07-21',
    category: '技术',
    tags: ['Deep Learning', '入门']
  },
  {
    slug: 'article-name',
    title: '欢迎来到我的博客',
    date: '2026-07-20',
    category: 'General',
    tags: ['随笔']
  }
];

// ---------- 文章列表渲染 ----------
(function renderPostList() {
  const box = document.getElementById('post-list');
  if (!box) return;
  box.innerHTML = POSTS.map(function (p) {
    return (
      '<li>' +
      '<span class="date">' + p.date + '</span>' +
      '<a class="title" href="/posts/' + p.slug + '/">' + p.title + '</a>' +
      '</li>'
    );
  }).join('');
})();

// ---------- 页脚年份 ----------
(function renderYear() {
  const el = document.getElementById('year');
  if (!el) return;
  const now = new Date().getFullYear();
  el.textContent = SITE.startYear + (now > SITE.startYear ? ' - ' + now : '');
})();

// ---------- 数学公式：检测到 $ 或 \( \[ 时自动加载本地 KaTeX 渲染 ----------
(function setupMath() {
  const content = document.querySelector('.post-content');
  if (!content) return;
  const text = content.textContent || '';
  const hasMath = /\$|\\\(|\\\[/.test(text);
  if (!hasMath) return;

  const KATEX_DIR = '/lib/katex';

  // KaTeX 样式
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = KATEX_DIR + '/katex.min.css';
  document.head.appendChild(link);

  // 按顺序加载 katex 核心 → auto-render，然后渲染
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  loadScript(KATEX_DIR + '/katex.min.js')
    .then(function () { return loadScript(KATEX_DIR + '/auto-render.min.js'); })
    .then(function () {
      renderMathInElement(content, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      });
    })
    .catch(function (err) {
      console.error('KaTeX 加载失败：', err);
    });
})();

// ---------- 当前页导航高亮（body 上加 data-nav，如 data-nav="/posts/"） ----------
(function highlightNav() {
  const current = document.body.getAttribute('data-nav');
  if (!current) return;
  document.querySelectorAll('.navigation-link').forEach(function (link) {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
})();
