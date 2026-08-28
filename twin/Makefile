SHELL         := /bin/bash
.SHELLFLAGS   := -eu -o pipefail -c
.DEFAULT_GOAL := help

.ONESHELL:
.PHONY: help init start lint_check lint clean

## Show this help message
help:
	@echo "Makefile targets:"
	@echo ""
	@awk '/^## /{desc = substr($$0, 4)} /^[a-zA-Z_-]+:/{if (desc) {target = $$1; sub(/:.*/, "", target); printf "  make %-20s- %s\n", target, desc; desc = ""}}' $(MAKEFILE_LIST)
	@echo ""

## Initialize project (install deps)
init:
	@which uv > /dev/null || (echo "Error: uv is not installed. Please install uv: https://docs.astral.sh/uv/getting-started/installation/" && exit 1)
	uv venv .venv
	uv sync

## Starts the app
start:
	uv run python -m src.app

## Runs ruff linter on all files
lint_check:
	uv run ruff check .

## Apply linter to all files
lint:
	uv run ruff format .
	uv run ruff check --fix .

## Remove build artefacts, caches, .venv, __pycache__
clean:
	rm -rf .venv .ruff_cache
	find . -type d -name __pycache__ -prune -exec rm -rf {} +
