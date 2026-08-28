from openai import OpenAI

from .config import settings

openai = OpenAI(api_key=settings.openai_api_key)
