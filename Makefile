.PHONY: setup clean install fix check

setup:
	cp manifest.json.example manifest.json
	@echo "Setup complete. Edit manifest.json to your liking."

clean:
	rm -rf node_modules

install:
	npm install

fix: install
	npm run fix-all

check: install
	npm run check-all
