## LIST COMMANDS ##
.PHONY: list
list: ## List all make commands
	@grep -E '(^##)|(^[a-zA-Z_-]+:.*?## .*$$)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; \
    { \
        if (NF == 1) { \
            cmd = "tput cols"; \
            cmd | getline width; \
            close(cmd); \
            title = $$1; \
            len = length(title); \
            padding = int((width - len) / 2); \
            printf "\n\033[1;34m\033[44m%" padding "s%s%" padding "s\033[0m\n", "", title, "" \
        } else { \
            printf "\033[36m%-30s\033[0m %s\n", $$1, $$2 \
        } \
    }'

## SYMFONY ##
cc: ## Clear cache
	@sudo rm -rf var/cache
	@php bin/console cache:clear
	@sudo chmod -R 777 var/cache

migration: ## Create migration
	@php bin/console make:migration

migrate: ## Migrate database
	@php bin/console doctrine:migrations:migrate

router: ## Show all routes
	@php bin/console debug:router

test: ## Run PHP CS Fixer with fix
	@composer test

test-unit: ## Run PHP CS Fixer with fix
	@composer test-class

## CODING STANDARDS ##
stan: ## Run PHPStan
	@vendor/bin/phpstan analyse -c phpstan.dist.neon

cs: ## Run PHP CS Fixer
	@vendor/bin/php-cs-fixer fix --dry-run

cs-fix: ## Run PHP CS Fixer with fix
	@vendor/bin/php-cs-fixer fix