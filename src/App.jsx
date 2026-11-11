import { useEffect, useState } from 'react'
import './App.css'

const questions = [
  { q: 'О чём ты хочешь говорить чаще всего?', a: ['Медленные будни и маленькие радости', 'Дом, уют и мои находки', 'Путешествия и места', 'Стиль, красота и уход'] },
  { q: 'Какое чувство должен унести читатель?', a: ['Вдохновение начать своё', 'Спокойствие и тепло', 'Улыбку и лёгкость', 'Полезную идею на сегодня'] },
  { q: 'Что сейчас сложнее всего?', a: ['Регулярно придумывать темы', 'Понять, для кого я пишу', 'Набрать вовлечённую аудиторию', 'Превратить блог в доход'] },
]
const formats = [
  { id: 'Точка роста', time: '45 минут', price: 'Для ясности', text: 'Разберём блог, найдём одну главную точку роста и соберём план на ближайший месяц.' },
  { id: 'Новый сезон', time: '90 минут', price: 'Для перемен', text: 'Глубокая распаковка темы, аудитории и контента. Уйдёшь с системой и редакционным ритмом.' },
  { id: 'Рядом', time: '4 недели', price: 'С поддержкой', text: 'Личные встречи и мягкое сопровождение: от идеи до первых устойчивых результатов.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [format, setFormat] = useState('Точка роста')
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(false)
  const [sent, setSent] = useState(false)
  const [faqOpen, setFaqOpen] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!modal) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') setModal(false) }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [modal])

  const openBooking = (selected = format) => { setFormat(selected); setSent(false); setModal(true) }
  const closeMenu = () => setMenuOpen(false)
  const submitBooking = (event) => { event.preventDefault(); setSent(true) }

  return <>
    <header className="header">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">л.</span><span>листва<small>блог растёт изнутри</small></span></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i/><i/></button>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Главное меню">
        <a href="#approach" onClick={closeMenu}>Подход</a><a href="#steps" onClick={closeMenu}>Как растём</a><a href="#diagnostic" onClick={closeMenu}>Мини-тест</a><a href="#stories" onClick={closeMenu}>Истории</a>
      </nav>
      <button className="button button-small header-cta" onClick={() => openBooking()}>Выбрать встречу <span>↗</span></button>
    </header>

    <main id="home">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="sun">✳</span> ПРО БЛОГ, КОТОРЫЙ ПОХОЖ НА ТЕБЯ</div>
          <h1>Твой блог.<br/><em>Твой голос.</em><br/>Твой сезон.</h1>
          <p className="hero-text">Помогаю лайфстайл-авторам расти бережно и по-своему — без погони за трендами и чужих сценариев.</p>
          <div className="hero-actions"><a className="button" href="#formats">Найти свою точку роста <span>↗</span></a><a className="text-link" href="#approach">Узнать, как это работает <span>↓</span></a></div>
          <div className="hero-note"><span className="note-dot"/> Спокойная стратегия для настоящей жизни</div>
        </div>
        <div className="hero-art" aria-label="Осенний натюрморт с блокнотом и листьями">
          <div className="hero-photo" role="img" aria-label="Тёплый осенний свет на рабочем столе автора блога" />
          <div className="photo-caption"><span>01 / 04</span><span>РАСТИ В СВОЁМ РИТМЕ</span></div>
          <div className="leaf-stamp">лист<br/><b>за</b><br/>листом</div>
          <div className="floating-note">«Не громче.<br/>А ближе.» <span>— заметка на полях</span></div>
        </div>
        <div className="hero-index">01 <i/> 04</div>
      </section>

      <section className="intro section reveal" id="approach">
        <div className="section-label">НАЧАТЬ С СЕБЯ <span>✳</span></div>
        <div className="intro-body"><h2>Не ещё один блог.<br/><em>А твой — настоящий.</em></h2><div><p>Хороший лайфстайл-блог не обязан быть идеальным. Он должен быть узнаваемым: в интонации, деталях и том, как ты смотришь на обычный день.</p><p>Вместе мы найдём эту нить и превратим её в понятный контент-план, которому легко следовать в жизни, а не только в заметках.</p><a className="arrow-link" href="#steps">Мой подход <span>↗</span></a></div></div>
        <div className="scribble">медленно<br/>тоже значит<br/><em>вперёд</em> ↗</div>
      </section>

      <section className="steps section" id="steps">
        <div className="steps-head reveal"><div className="section-label">БЕЗ СЕКРЕТНЫХ ФОРМУЛ <span>✳</span></div><h2>Сначала — корни.<br/><em>Потом — рост.</em></h2><p>Три спокойных шага, чтобы твой блог обрёл ясность и направление.</p></div>
        <div className="step-list">
          <article className="step-card reveal"><span className="step-no">01</span><div className="step-icon icon-sage">✿</div><div><h3>Найти своё</h3><p>Распутаем интересы, опыт и то, что хочется рассказывать даже без охватов.</p></div><span className="step-flower">✳</span></article>
          <article className="step-card reveal"><span className="step-no">02</span><div className="step-icon icon-peach">⌁</div><div><h3>Услышать своих</h3><p>Поймём, кому близок твой взгляд и какие истории хочется читать до конца.</p></div><span className="step-flower">✳</span></article>
          <article className="step-card reveal"><span className="step-no">03</span><div className="step-icon icon-lilac">↗</div><div><h3>Расти в ритме</h3><p>Соберём живую систему публикаций, общения и продвижения без выгорания.</p></div><span className="step-flower">✳</span></article>
        </div>
      </section>

      <section className="diagnostic section reveal" id="diagnostic">
        <div className="diagnostic-image" role="img" aria-label="Осенний дневник с заметками и сухими листьями"><span>ПАУЗА ДЛЯ СЕБЯ</span></div>
        <div className="diagnostic-copy"><div className="section-label">МАЛЕНЬКАЯ ПОДСКАЗКА <span>✳</span></div><h2>Почувствуй, куда<br/><em>тянется твой блог</em></h2><p>Три вопроса — и у тебя появится первая нить, за которую можно потянуть.</p>
          {!result ? <div className="quiz">{questions.map((item, index) => <fieldset className="quiz-question" key={item.q}><legend><span>0{index + 1}</span>{item.q}</legend><div className="quiz-options">{item.a.map((answer) => <button aria-pressed={answers[index] === answer} className={answers[index] === answer ? 'quiz-option selected' : 'quiz-option'} key={answer} onClick={() => setAnswers({ ...answers, [index]: answer })}>{answer}<span>＋</span></button>)}</div></fieldset>)}<button className="button quiz-submit" disabled={Object.keys(answers).length < questions.length} onClick={() => setResult(true)}>Показать мою подсказку <span>↗</span></button></div> : <div className="result-card"><span>ТВОЯ ПЕРВАЯ НИТЬ</span><h3>{answers[2]?.includes('тем') ? 'Собери свои темы в одну историю.' : answers[2]?.includes('аудиторию') ? 'Начни с разговора со своими читателями.' : answers[2]?.includes('доход') ? 'Расти через ценность, которую уже даёшь.' : 'Выбери один устойчивый ритм на месяц.'}</h3><p>Не нужно решить всё сегодня. Возьми эту мысль с собой — или разберём её вместе на встрече.</p><button className="text-link" onClick={() => setResult(false)}>Пройти ещё раз ↻</button></div>}
        </div>
      </section>

      <section className="formats section" id="formats">
        <div className="formats-head reveal"><div><div className="section-label">ВЫБЕРИ СВОЙ ТЕМП <span>✳</span></div><h2>Место для<br/><em>следующего шага.</em></h2></div><p>Каждая встреча начинается с твоей истории.<br/>Выбери формат, который подходит сейчас.</p></div>
        <div className="format-grid">{formats.map((item, index) => <article className={`format-card format-${index + 1} reveal`} key={item.id}><div className="format-top"><span>0{index + 1} / ВМЕСТЕ</span><span>{item.time}</span></div><h3>{item.id}</h3><span className="format-price">{item.price}</span><p>{item.text}</p><button className="format-link" onClick={() => openBooking(item.id)}>Выбрать встречу <span>↗</span></button></article>)}</div>
        <div className="format-foot"><span>Не уверена, с чего начать?</span><button className="text-link" onClick={() => openBooking('Точка роста')}>Расскажешь мне — подберём вместе ↗</button></div>
      </section>

      <section className="quote-section" id="stories"><div className="quote-photo" role="img" aria-label="Солнечная прогулка среди золотых осенних листьев"/><div className="quote-copy reveal"><div className="section-label">ИСТОРИИ РОСТА <span>✳</span></div><div className="quote-mark">“</div><blockquote>Я перестала придумывать себе образ и наконец начала замечать, что людям интересна именно моя жизнь.</blockquote><div className="quote-author"><span className="avatar">А</span><span><b>Алина</b><small>блог о доме и повседневности</small></span><span className="quote-rating">★★★★★</span></div><div className="quote-bottom">01 <i/> 03 <span>После нашей первой встречи</span></div></div></section>

      <section className="faq section reveal"><div><div className="section-label">ЧАСТО СПРАШИВАЮТ <span>✳</span></div><h2>Перед тем,<br/><em>как написать.</em></h2><p>Никаких правильных ответов не нужно. Только твоя отправная точка.</p></div><div className="faq-list">{[
        ['У меня пока совсем маленький блог. Есть смысл?', 'Конечно. Начинать с ясной идеи и близкой аудитории часто проще, чем перестраивать уже сложившийся контент.'],
        ['Нужно ли готовиться к консультации?', 'Нет. Достаточно прийти с тем, что сейчас крутится в голове. Если есть блог или заметки — захвати, но это необязательно.'],
        ['Можно ли встретиться онлайн?', 'Да, все форматы проходят онлайн. После записи мы согласуем удобное время и пришлём ссылку на встречу.'],
        ['Что будет после встречи?', 'Ты получишь короткий конспект главных идей и конкретные следующие шаги, чтобы не потерять импульс.'],
      ].map(([question, answer], index) => <div className={faqOpen === index ? 'faq-item faq-active' : 'faq-item'} key={question}><button aria-expanded={faqOpen === index} onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}><span>{question}</span><i>{faqOpen === index ? '−' : '+'}</i></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></section>

      <section className="closing"><div className="closing-spark">✳</div><div className="section-label">МОЖНО НАЧАТЬ СЕГОДНЯ</div><h2>У каждого роста<br/>есть <em>свой сезон.</em></h2><p>Давай найдём твой — спокойно, по-настоящему, вместе.</p><button className="button button-light" onClick={() => openBooking()}>Записаться на встречу <span>↗</span></button><small>Без обязательств. Просто первый разговор.</small><div className="closing-leaf">✳</div></section>
    </main>

    <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">л.</span><span>листва<small>блог растёт изнутри</small></span></a><span className="footer-note">Идеи созревают в своём темпе.</span><div className="footer-links"><a href="#approach">Подход</a><a href="#formats">Встречи</a><a href="#stories">Истории</a><button onClick={() => openBooking()}>Связаться ↗</button></div><span className="copyright">© 2026 Листва</span></footer>

    {modal && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(false) }}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" aria-label="Закрыть" onClick={() => setModal(false)}>×</button>{!sent ? <><div className="section-label">ПЕРВЫЙ ШАГ — ПРОСТО РАЗГОВОР <span>✳</span></div><h2 id="booking-title">Давай знакомиться.</h2><p>Оставь контакт, и мы договоримся о времени.</p><form onSubmit={submitBooking}><label>Как тебя зовут?<input name="name" placeholder="Твоё имя" required autoComplete="name"/></label><label>Куда написать?<input name="contact" placeholder="Telegram или email" required/></label><label>Формат встречи<select value={format} onChange={(e) => setFormat(e.target.value)}>{formats.map((x) => <option key={x.id}>{x.id}</option>)}</select></label><label className="consent"><input type="checkbox" required/><span>Согласна на обработку данных для связи со мной.</span></label><button className="button" type="submit">Отправить заявку <span>↗</span></button></form><small>Демонстрация: отправка заявок пока не подключена.</small></> : <div className="success"><div>✳</div><h2>Форма готова.</h2><p>Это демонстрационный сайт: заявка пока не отправляется. Перед публикацией подключи форму к почте или CRM.</p><button className="button" onClick={() => setModal(false)}>Вернуться на страницу <span>↗</span></button></div>}</section></div>}
  </>
}

export default App
