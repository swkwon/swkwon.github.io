---
layout: default
---

slack에 포함된 글들:
<ul>
	{% for post in site.categories.slack %}
	<li><a href="{{ post.url }}">{{ post.title }}</a></li>
	{% endfor %}
</ul>