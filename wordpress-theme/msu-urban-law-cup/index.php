<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
    <meta name="description" content="Командное соревнование студентов по разработке решений спорных правовых ситуаций в области земельного и градостроительного права">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

    <!-- HEADER -->
    <header class="t-header">
        <div class="container">
            <a href="<?php echo home_url(); ?>" class="t-header__logo">MSU <span>Urban Law Cup</span></a>
            <nav>
                <ul class="t-header__nav">
                    <li><a href="#about">О конкурсе</a></li>
                    <li><a href="#results">Результаты</a></li>
                    <li><a href="#finals">О финале</a></li>
                    <li><a href="#gallery">Галерея</a></li>
                    <li><a href="#organizers">Организаторы</a></li>
                    <li><a href="#contacts">Контакты</a></li>
                </ul>
            </nav>
            <button class="t-header__mobile" aria-label="Меню">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <!-- HERO -->
    <section class="t-cover">
        <div class="t-cover__bg" style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/photos/0450.jpg');"></div>
        <div class="t-cover__overlay"></div>
        <div class="t-cover__content">
            <div class="t-cover__badge">II Открытый студенческий конкурс 2025</div>
            <h1 class="t-cover__title">
                Кубок МГУ по <span>земельному</span> и <span>градостроительному</span> праву
            </h1>
            <p class="t-cover__subtitle">
                Командное соревнование студентов по разработке решений спорных правовых ситуаций, связанных с актуальными проблемами применения земельного и градостроительного законодательства
            </p>
            <p class="t-cover__name">имени О.И. Крассова</p>
            <div class="t-cover__date">
                <div class="t-cover__date-item">
                    <div class="t-cover__date-label">Дата финала</div>
                    <div class="t-cover__date-value">12 апреля 2025</div>
                </div>
                <div class="t-cover__date-item">
                    <div class="t-cover__date-label">Место проведения</div>
                    <div class="t-cover__date-value">МГУ им. М.В. Ломоносова</div>
                </div>
            </div>
            <div class="t-cover__buttons">
                <a href="#" class="t-btn t-btn--primary">Принять участие</a>
                <a href="#results" class="t-btn t-btn--outline">Результаты 2025</a>
            </div>
        </div>
        <div class="t-cover__scroll">
            <div class="t-cover__scroll-text">Прокрутите вниз</div>
            <div class="t-cover__scroll-line"></div>
        </div>
    </section>

    <!-- О КОНКУРСЕ -->
    <section id="about" class="t-section">
        <div class="t-container">
            <div class="t-about__grid">
                <div class="t-about__image">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/photos/0D3A6970.jpg" alt="Участники конкурса MSU Urban Law Cup">
                </div>
                <div class="t-about__content">
                    <h3>О конкурсе</h3>
                    <p>
                        <strong>Кубок МГУ по земельному и градостроительному праву</strong> — это командное соревнование студентов по разработке решений спорных правовых ситуаций, связанных с актуальными проблемами применения земельного и градостроительного законодательства.
                    </p>
                    <p>
                        Конкурс проводится на базе Юридического факультета МГУ имени М.В. Ломоносова и объединяет лучших студентов-юристов со всей России.
                    </p>
                    <p>
                        Участники работают над реальными кейсами под руководством практикующих юристов и преподавателей ведущих вузов страны, развивая навыки правового анализа и командной работы.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- ЦЕЛИ КОНКУРСА -->
    <section class="t-section t-section--gray">
        <div class="t-container">
            <div class="t-section__header">
                <div class="t-section__label">Миссия</div>
                <h2 class="t-section__title">Цели конкурса</h2>
            </div>
            <div class="t-goals__grid">
                <div class="t-goal-card">
                    <div class="t-goal-card__number">01</div>
                    <div class="t-goal-card__icon">
                        <svg viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
                    </div>
                    <h3 class="t-goal-card__title">Развитие интереса</h3>
                    <p class="t-goal-card__text">
                        Воспитание у студентов интереса к земельному и градостроительному праву как к перспективной сфере юридической деятельности
                    </p>
                </div>
                <div class="t-goal-card">
                    <div class="t-goal-card__number">02</div>
                    <div class="t-goal-card__icon">
                        <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                    </div>
                    <h3 class="t-goal-card__title">Выявление талантов</h3>
                    <p class="t-goal-card__text">
                        Определение лучших студентов, проявляющих интерес к актуальным вопросам земельного законодательства и градостроительной деятельности
                    </p>
                </div>
                <div class="t-goal-card">
                    <div class="t-goal-card__number">03</div>
                    <div class="t-goal-card__icon">
                        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    </div>
                    <h3 class="t-goal-card__title">Создание сообщества</h3>
                    <p class="t-goal-card__text">
                        Формирование профессионального сообщества студентов, преподавателей и практикующих юристов в сфере земельного права
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- РЕЗУЛЬТАТЫ / ПОБЕДИТЕЛИ -->
    <section id="results" class="t-section">
        <div class="t-container">
            <div class="t-section__header">
                <div class="t-section__label">Результаты II конкурса</div>
                <h2 class="t-section__title">Победители 2025</h2>
                <p class="t-section__desc">
                    Поздравляем победителей и призёров II Открытого студенческого Кубка МГУ по земельному и градостроительному праву!
                </p>
            </div>
            <div class="t-winners__grid">
                <div class="t-winner-card t-winner-card--gold">
                    <div class="t-winner-card__place">1</div>
                    <div class="t-winner-card__image">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/photos/0430.jpg" alt="Команда КапиталЪ - победители">
                    </div>
                    <div class="t-winner-card__content">
                        <h3 class="t-winner-card__team">КапиталЪ</h3>
                        <p class="t-winner-card__university">МГУ им. М.В. Ломоносова</p>
                    </div>
                </div>
                <div class="t-winner-card t-winner-card--silver">
                    <div class="t-winner-card__place">2</div>
                    <div class="t-winner-card__image">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/photos/0432.jpg" alt="Команда LandLawrds">
                    </div>
                    <div class="t-winner-card__content">
                        <h3 class="t-winner-card__team">LandLawrds</h3>
                        <p class="t-winner-card__university">МГУ им. М.В. Ломоносова</p>
                    </div>
                </div>
                <div class="t-winner-card t-winner-card--bronze">
                    <div class="t-winner-card__place">3</div>
                    <div class="t-winner-card__image">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/photos/0433.jpg" alt="Команда КиМ">
                    </div>
                    <div class="t-winner-card__content">
                        <h3 class="t-winner-card__team">КиМ</h3>
                        <p class="t-winner-card__university">УрГЮУ им. В.Ф. Яковлева</p>
                    </div>
                </div>
            </div>
            <div style="text-align: center;">
                <a href="#" class="t-btn t-btn--orange">Пресс-релиз о победителях</a>
            </div>
        </div>
    </section>

    <!-- СТАТИСТИКА -->
    <section class="t-section t-section--sm t-section--dark">
        <div class="t-container">
            <div class="t-stats">
                <div class="t-stat-item">
                    <div class="t-stat-item__number">50+</div>
                    <div class="t-stat-item__label">Команд-участников</div>
                </div>
                <div class="t-stat-item">
                    <div class="t-stat-item__number">20+</div>
                    <div class="t-stat-item__label">Вузов России</div>
                </div>
                <div class="t-stat-item">
                    <div class="t-stat-item__number">15</div>
                    <div class="t-stat-item__label">Членов жюри</div>
                </div>
                <div class="t-stat-item">
                    <div class="t-stat-item__number">2</div>
                    <div class="t-stat-item__label">Года проведения</div>
                </div>
            </div>
        </div>
    </section>

    <!-- ЦИТАТА -->
    <section class="t-quote">
        <div class="t-container">
            <div class="t-quote__content">
                <div class="t-quote__icon">"</div>
                <p class="t-quote__text">
                    Этот конкурс символизирует преемственность поколений. Каждый финалист подтверждает: наше будущее в надёжных руках — у профессионалов, которые уже сегодня создают завтрашний день своими идеями и энтузиазмом.
                </p>
                <div class="t-quote__author">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/photos/0066.jpg" alt="Денис Рыбаков" class="t-quote__author-photo">
                    <div class="t-quote__author-info">
                        <div class="t-quote__author-name">Денис Рыбаков</div>
                        <div class="t-quote__author-title">Председатель Коллегии адвокатов «Регионсервис», член Общественной палаты РФ</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ГАЛЕРЕЯ -->
    <section id="gallery" class="t-section t-section--gray">
        <div class="t-container">
            <div class="t-section__header">
                <div class="t-section__label">Фотоотчёт</div>
                <h2 class="t-section__title">Галерея</h2>
            </div>
            <div class="t-gallery__grid">
                <div class="t-gallery__item">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/photos/0450.jpg" alt="Финал конкурса MSU Urban Law Cup">
                </div>
                <div class="t-gallery__item">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/photos/0440.jpg" alt="Награждение победителей">
                </div>
                <div class="t-gallery__item">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/photos/0069.jpg" alt="Участники конкурса">
                </div>
                <div class="t-gallery__item">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/photos/0195.jpg" alt="Жюри конкурса">
                </div>
                <div class="t-gallery__item">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/photos/0066.jpg" alt="Выступление участников">
                </div>
            </div>
        </div>
    </section>

    <!-- О ФИНАЛЕ -->
    <section id="finals" class="t-section">
        <div class="t-container">
            <div class="t-section__header">
                <div class="t-section__label">Информация</div>
                <h2 class="t-section__title">О финале конкурса</h2>
            </div>
            <div class="t-finals__grid">
                <div class="t-finals__info">
                    <div class="t-finals__item">
                        <div class="t-finals__item-icon">
                            <svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
                        </div>
                        <div class="t-finals__item-content">
                            <h4>Дата проведения</h4>
                            <p>12 апреля 2025 года</p>
                        </div>
                    </div>
                    <div class="t-finals__item">
                        <div class="t-finals__item-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        </div>
                        <div class="t-finals__item-content">
                            <h4>Место проведения</h4>
                            <p>Юридический факультет МГУ им. М.В. Ломоносова, г. Москва</p>
                        </div>
                    </div>
                    <div class="t-finals__item">
                        <div class="t-finals__item-icon">
                            <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                        </div>
                        <div class="t-finals__item-content">
                            <h4>Формат</h4>
                            <p>Очное командное соревнование с решением практических кейсов</p>
                        </div>
                    </div>
                    <div class="t-finals__item">
                        <div class="t-finals__item-icon">
                            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
                        </div>
                        <div class="t-finals__item-content">
                            <h4>Оценка</h4>
                            <p>Экспертное жюри из ведущих практикующих юристов и преподавателей</p>
                        </div>
                    </div>
                </div>
                <div class="t-finals__image">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/photos/0D3A6970.jpg" alt="Финал конкурса">
                </div>
            </div>
        </div>
    </section>

    <!-- ОРГАНИЗАТОРЫ -->
    <section id="organizers" class="t-section t-section--gray">
        <div class="t-container">
            <div class="t-section__header">
                <div class="t-section__label">Команда</div>
                <h2 class="t-section__title">Организаторы</h2>
            </div>
            <div class="t-organizers__grid">
                <div class="t-organizer-card">
                    <div class="t-organizer-card__logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/logos/msu-law-logo.png" alt="Юридический факультет МГУ">
                    </div>
                    <div class="t-organizer-card__content">
                        <h4>Юридический факультет МГУ</h4>
                        <p>Московский государственный университет имени М.В. Ломоносова — ведущий вуз страны с богатыми традициями в области юридического образования</p>
                    </div>
                </div>
                <div class="t-organizer-card">
                    <div class="t-organizer-card__logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/logos/regionservis-logo.jpg" alt="Коллегия адвокатов Регионсервис">
                    </div>
                    <div class="t-organizer-card__content">
                        <h4>Коллегия адвокатов «Регионсервис»</h4>
                        <p>Ведущая юридическая практика России, специализирующаяся на земельном и градостроительном праве</p>
                    </div>
                </div>
            </div>

            <!-- При поддержке -->
            <div class="t-partners__section">
                <div class="t-partners__label">При поддержке</div>
                <div class="t-partners__grid">
                    <div class="t-partner-logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/logos/government-ru.png" alt="Правительство России">
                    </div>
                    <div class="t-partner-logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/logos/rosreestr-logo.jpg" alt="Росреестр">
                    </div>
                </div>
            </div>

            <!-- Партнёры -->
            <div class="t-partners__section">
                <div class="t-partners__label">Партнёры</div>
                <div class="t-partners__grid">
                    <div class="t-partner-logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/partners/gasl.svg" alt="GASL">
                    </div>
                    <div class="t-partner-logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/partners/partner1.png" alt="Партнёр">
                    </div>
                    <div class="t-partner-logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/partners/lidery2024.png" alt="Лидеры 2024">
                    </div>
                    <div class="t-partner-logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/partners/partner3.png" alt="Партнёр">
                    </div>
                    <div class="t-partner-logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/partners/frame83.png" alt="Партнёр">
                    </div>
                </div>
            </div>

            <!-- Информационные партнёры -->
            <div class="t-partners__section">
                <div class="t-partners__label">Информационные партнёры</div>
                <div class="t-partners__grid">
                    <div class="t-partner-logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/partners/pravo-ru.png" alt="Право.ру">
                    </div>
                    <div class="t-partner-logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/partners/info-partner.jpg" alt="Информационный партнёр">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="t-cta">
        <div class="t-cta__bg" style="background-image: url('<?php echo get_template_directory_uri(); ?>/images/photos/0440.jpg');"></div>
        <div class="t-container">
            <div class="t-cta__content">
                <h2 class="t-cta__title">Готовы принять участие?</h2>
                <p class="t-cta__text">
                    Присоединяйтесь к лучшим студентам-юристам России и покажите свои знания в области земельного и градостроительного права
                </p>
                <div class="t-cta__buttons">
                    <a href="#" class="t-btn t-btn--primary">Подать заявку</a>
                    <a href="#" class="t-btn t-btn--outline">Узнать подробности</a>
                </div>
            </div>
        </div>
    </section>

    <!-- КОНТАКТЫ -->
    <section id="contacts" class="t-section">
        <div class="t-container">
            <div class="t-section__header">
                <div class="t-section__label">Связь</div>
                <h2 class="t-section__title">Контакты</h2>
            </div>
            <div class="t-contacts__grid">
                <div class="t-contact-card">
                    <div class="t-contact-card__icon">
                        <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    </div>
                    <h3 class="t-contact-card__title">Адрес</h3>
                    <p class="t-contact-card__text">
                        г. Москва, Ленинские горы, д. 1, стр. 13<br>
                        Юридический факультет МГУ
                    </p>
                </div>
                <div class="t-contact-card">
                    <div class="t-contact-card__icon">
                        <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    </div>
                    <h3 class="t-contact-card__title">Email</h3>
                    <p class="t-contact-card__text">
                        <a href="mailto:urbanlawcup@law.msu.ru">urbanlawcup@law.msu.ru</a>
                    </p>
                </div>
                <div class="t-contact-card">
                    <div class="t-contact-card__icon">
                        <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    </div>
                    <h3 class="t-contact-card__title">Телефон</h3>
                    <p class="t-contact-card__text">
                        <a href="tel:+74959391000">+7 (495) 939-10-00</a>
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="t-footer">
        <div class="t-container">
            <div class="t-footer__top">
                <div>
                    <div class="t-footer__logo">MSU <span>Urban Law Cup</span></div>
                    <p class="t-footer__desc">
                        Открытый студенческий конкурс по земельному и градостроительному праву имени О.И. Крассова
                    </p>
                </div>
                <div>
                    <div class="t-footer__title">Навигация</div>
                    <ul class="t-footer__links">
                        <li><a href="#about">О конкурсе</a></li>
                        <li><a href="#results">Результаты</a></li>
                        <li><a href="#finals">О финале</a></li>
                        <li><a href="#gallery">Галерея</a></li>
                    </ul>
                </div>
                <div>
                    <div class="t-footer__title">Информация</div>
                    <ul class="t-footer__links">
                        <li><a href="#">Регламент</a></li>
                        <li><a href="#">Жюри</a></li>
                        <li><a href="#">Оргкомитет</a></li>
                        <li><a href="#">Вебинар</a></li>
                    </ul>
                </div>
                <div>
                    <div class="t-footer__title">Контакты</div>
                    <ul class="t-footer__links">
                        <li><a href="mailto:urbanlawcup@law.msu.ru">urbanlawcup@law.msu.ru</a></li>
                        <li><a href="tel:+74959391000">+7 (495) 939-10-00</a></li>
                        <li><a href="#">Telegram</a></li>
                    </ul>
                </div>
            </div>
            <div class="t-footer__bottom">
                <div class="t-footer__copy">
                    © 2024-2025 MSU Urban Law Cup. Все права защищены.
                </div>
                <div class="t-footer__socials">
                    <a href="#" class="t-footer__social" aria-label="Telegram">
                        <svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    </a>
                    <a href="#" class="t-footer__social" aria-label="VK">
                        <svg viewBox="0 0 24 24"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.713-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.563c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.684 4 8.2c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.49 2.27 4.676 2.853 4.676.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.475-.085.72-.576.72z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>

<?php wp_footer(); ?>
</body>
</html>
