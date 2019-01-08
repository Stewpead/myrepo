#pragma once

#include <iostream>
#include <string>
#include <stack>

class Helper
{
	public:
		static std::string parseJSON(std::string& buffer, bool trim = false)
		{
			int opening = buffer.find('{');
			int closing = buffer.find('}');

			if (opening != std::string::npos && closing != std::string::npos && opening < closing)
			{
				int range = closing - opening + 1;
				std::string str = buffer.substr(opening, range);
				
				if (trim)
				{
					buffer.erase(opening, range);
				}
				
				return str;
			}
			
			return "";
		}
		
		static std::string parseNestedJSON(std::string& buffer, bool trim = false)
		{
			int pos = buffer.find('{');

			if (pos != std::string::npos)
			{
				int i = pos + 1;
				
				std::stack<char> stack;
				stack.push('{');
				
				for (; i < buffer.length() && !stack.empty(); ++i)
				{
					if (buffer[i] == '}')
					{
						if (stack.top() == '{')
						{
							stack.pop();
						}
					} 
					else if (buffer[i] == '{')
					{
						stack.push('{');
					}
				}
				
				int range = i - pos;
				if (buffer.length() < range) range = buffer.length() - 1;
				std::string str = buffer.substr(pos, range);
				
				if (trim)
				{
					buffer.erase(pos, range);
				}
				
				return str;
			}
			
			return "";
		}
};
