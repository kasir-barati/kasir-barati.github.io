import gradio as gr
from dotenv import load_dotenv

from .chat import chat
from .styles import CSS, EXAMPLES, JS

if __name__ == "__main__":
    load_dotenv()
    gr.ChatInterface(
        chat,
        examples=EXAMPLES,
        title="Digital Twin",
        description="Talk to my AI twin about my career",
        chatbot=gr.Chatbot(show_label=False),
    ).launch(css=CSS, js=JS, theme=gr.themes.Base(), footer_links=[])
