deploy:
	git push
	echo
	ssh j2m 'cd WWW/klima; git pull'
