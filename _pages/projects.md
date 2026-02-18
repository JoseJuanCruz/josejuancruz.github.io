---
layout: page
title: projects
title_es: proyectos
permalink: /projects/
description: A growing collection of your cool projects.
description_es: Una colección creciente de tus proyectos interesantes.
nav: true
nav_order: 3
display_categories: [work, fun]
horizontal: false
---

<!-- pages/projects.md -->
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category content-en">{{ category }}</h2>
    <h2 class="category content-es" style="display: none;">
      {% if category == 'work' %}trabajo{% elsif category == 'fun' %}diversión{% else %}{{ category }}{% endif %}
    </h2>
  </a>
  
  <!-- English projects -->
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign categorized_projects_en = categorized_projects | where: "lang", "en" %}
  {% assign sorted_projects = categorized_projects_en | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container content-en">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3 content-en">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  
  <!-- Spanish projects -->
  {% assign categorized_projects_es = categorized_projects | where: "lang", "es" %}
  {% assign sorted_projects_es = categorized_projects_es | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container content-es" style="display: none;">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects_es %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3 content-es" style="display: none;">
    {% for project in sorted_projects_es %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

<!-- English projects -->

{% assign sorted_projects = site.projects | where: "lang", "en" | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container content-en">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3 content-en">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}

<!-- Spanish projects -->

{% assign sorted_projects_es = site.projects | where: "lang", "es" | sort: "importance" %}

{% if page.horizontal %}

  <div class="container content-es" style="display: none;">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects_es %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3 content-es" style="display: none;">
    {% for project in sorted_projects_es %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
