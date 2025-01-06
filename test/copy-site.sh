#!/bin/bash

# ==============================
# |     Helper functions       |
# ==============================

RESET="\033[0m" # Reset to default color
BLACK="\033[0;30m"
NEAR_BLACK="\033[0;30;1m"
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
BLUE="\033[0;34m"
MAGENTA="\033[0;35m"
CYAN="\033[0;36m"
WHITE="\033[0;37m"

# Log messages with custom colors
log() {
  local level="$1"
  local message="$2"

  case "$level" in
    info)
      color="$NEAR_BLACK"
      ;;
    tip)
      color="$MAGENTA"
      ;;
    debug)
      color="$CYAN"
      ;;
    success)
      color="$GREEN"
      ;;
    warn)
      color="$YELLOW"
      ;;
    error)
      color="$RED"
      ;;
    *)
      color="$RESET"
      ;;
  esac

  echo -e "${NEAR_BLACK}$(date '+%H:%M:%S') - ${color}$message${RESET}"
}

# Handle cleanup and exit on Ctrl+C
cleanup() {
  log "error" "Exiting script due to user interrupt."
  exit 1
}
trap 'cleanup' SIGINT

# ==============================
# |     Main script logic      |
# ==============================

usage() {
  echo "Usage: $0 <new-directory-name>"
  exit 1
}

if [ "$#" -ne 1 ]; then
  log "error" "Invalid number of arguments."
  usage
fi

NEW_DIR="$1"
SOURCE_DIR="site-template"

if [ ! -d "$SOURCE_DIR" ]; then
  log "error" "Directory '$SOURCE_DIR' not found."
  exit 1
fi

if [ -d "$NEW_DIR" ]; then
  log "error" "Directory '$NEW_DIR' already exists."
  exit 1
fi

mkdir "$NEW_DIR"
log "info" "Created directory '$NEW_DIR'"

rsync -av --exclude='node_modules/' --exclude='.git/' "$SOURCE_DIR"/ "$NEW_DIR"/

log "info" "Copied files from '$SOURCE_DIR' to '$NEW_DIR' excluding 'node_modules/' and '.git/'"
log "success" "Website copied successfully to '$NEW_DIR'."
