#pragma once

#include <chrono>

class TimeManager
{
	public:
		TimeManager();
		~TimeManager();
		bool onInterval(float seconds);
		float update();
		float getDelta();
		void setIntervalTick(float tick);
		
	private:
		float deltaTime;
		std::chrono::high_resolution_clock::time_point begin;
		std::chrono::high_resolution_clock::time_point end;
		float intervalTick;
};

TimeManager::TimeManager()
{
	deltaTime = 0;
	begin = std::chrono::high_resolution_clock::now();
	end = begin;
	intervalTick = 0;
}

void TimeManager::setIntervalTick(float tick)
{
	intervalTick = tick;
}

bool TimeManager::onInterval(float seconds)
{
	if ((unsigned)intervalTick < seconds) {
		intervalTick += deltaTime;
	} else {
		intervalTick = 0;
		return true;
	}
	
	return false;
}

float TimeManager::update()
{
	begin = std::chrono::high_resolution_clock::now();
	deltaTime = std::chrono::duration_cast<std::chrono::duration<float>>(begin - end).count();
	end = begin;
	
	return deltaTime;
}

TimeManager::~TimeManager()
{
	// placeholder
}
