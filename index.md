---
layout: default
title: Home
---

<ul>
    {% for post in site.posts %}
<li>
    <a href="{{ post.url }}"><font size="5">{{ post.title }}</font></a>
</li>
    {% endfor %}
</ul>