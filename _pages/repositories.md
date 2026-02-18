---
layout: page
permalink: /repositories/
title: repositories
title_es: repositorios
description: Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.
description_es: Edita el archivo `_data/repositories.yml` y cambia las listas `github_users` y `github_repos` para incluir tu propio perfil de GitHub y repositorios.
nav: true
nav_order: 4
---

{% if site.data.repositories.github_users %}

<h2 class="content-en">GitHub users</h2>
<h2 class="content-es" style="display: none;">Usuarios de GitHub</h2>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.liquid username=user %}
  {% endfor %}
</div>

---

{% if site.repo_trophies.enabled %}
{% for user in site.data.repositories.github_users %}
{% if site.data.repositories.github_users.size > 1 %}

  <h4>{{ user }}</h4>
  {% endif %}
  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo_trophies.liquid username=user %}
  </div>

---

{% endfor %}
{% endif %}
{% endif %}

{% if site.data.repositories.github_repos %}

<h2 class="content-en">GitHub Repositories</h2>
<h2 class="content-es" style="display: none;">Repositorios de GitHub</h2>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
