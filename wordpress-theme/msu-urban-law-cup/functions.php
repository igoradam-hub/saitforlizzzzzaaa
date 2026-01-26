<?php
/**
 * MSU Urban Law Cup Theme Functions
 */

// Подключение стилей темы
function msu_urban_law_cup_enqueue_styles() {
    wp_enqueue_style('msu-urban-law-cup-style', get_stylesheet_uri(), array(), '1.0');
}
add_action('wp_enqueue_scripts', 'msu_urban_law_cup_enqueue_styles');

// Поддержка возможностей темы
function msu_urban_law_cup_theme_setup() {
    // Заголовок сайта
    add_theme_support('title-tag');

    // Миниатюры записей
    add_theme_support('post-thumbnails');

    // HTML5 разметка
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Кастомный логотип
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));
}
add_action('after_setup_theme', 'msu_urban_law_cup_theme_setup');

// Разрешить загрузку SVG
function msu_allow_svg_upload($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'msu_allow_svg_upload');

// Убрать лишнее из head
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
