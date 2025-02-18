import os
from typing import List, Dict

class Message:
    def __init__(self, role: str, content: str):
        self.role = role
        self.content = content

class Chatbot:
    def __init__(self):
        self.conversation_history: List[Message] = []
    
    def add_message(self, role: str, content: str):
        """Add a message to the conversation history."""
        self.conversation_history.append(Message(role, content))
    
    async def get_response(self, user_input: str) -> str:
        """
        Get response from ChatGPT API.
        This is a placeholder that will be implemented once we have the API key.
        """
        self.add_message("user", user_input)
        # Placeholder response until we implement the actual API call
        mock_response = "This is a mock response. API integration pending."
        self.add_message("assistant", mock_response)
        return mock_response

def main():
    chatbot = Chatbot()
    print("ChatGPT Chatbot (Press Ctrl+C to exit)")
    print("----------------------------------------")
    
    try:
        while True:
            user_input = input("You: ")
            if user_input.lower() in ['exit', 'quit']:
                break
            
            import asyncio
            response = asyncio.run(chatbot.get_response(user_input))
            print(f"Assistant: {response}")
    
    except KeyboardInterrupt:
        print("\nGoodbye!")

if __name__ == "__main__":
    main()
