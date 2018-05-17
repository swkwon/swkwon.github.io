---
layout: default
---

<font size="5">
etc에 포함된 글들:
<ul>
	{% for post in site.categories.etc %}
	<li><a href="{{ post.url }}">{{ post.title }}</a></li>
	{% endfor %}
</ul>
</font>