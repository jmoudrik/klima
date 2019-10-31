deploy:
	git push
	ssh j2m 'cd WWW/klima; git pull'
