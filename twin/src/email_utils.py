import re

from typing import Final, Pattern


EMAIL_PATTERN: Final[Pattern[str]] = re.compile(
    r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
)


def extract_email(text: str) -> str | None:
    match = EMAIL_PATTERN.search(text)
    return match.group(0) if match else None


def is_valid_email(email: str) -> bool:
    # Basic application-level validation.
    # The regex above already does most of the work.
    return bool(EMAIL_PATTERN.fullmatch(email))
