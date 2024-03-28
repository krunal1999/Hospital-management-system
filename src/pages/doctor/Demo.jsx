import React from 'react'

function Demo() {
  console.log("Demo getting Render")
  
  function allocateTimeSlots(timeSlots, breakTime) {
    const allocatedSlots = [];
    
    // Iterate over each day's time slots
    timeSlots.forEach(slot => {
      const { day, startingTime, endingTime, breakStartingTime } = slot;
      const allocatedDaySlots = [];
      
      // Convert startingTime, endingTime, and breakStartingTime to minutes
      const startTime = convertToMinutes(startingTime);
      const endTime = convertToMinutes(endingTime);
      const breakStartTime = convertToMinutes(breakStartingTime);
      
      // Calculate the duration of the break in minutes
      const breakDuration = 60; // Assuming 1 hour break
      
      // Calculate the total available time for appointments (excluding break)
      const totalAvailableTime = endTime - startTime - breakDuration;
      
      // Calculate the number of 30-minute intervals
      const numberOfIntervals = Math.floor(totalAvailableTime / 30);
      
      // Allocate time slots for each patient
      let currentTime = startTime;
      for (let i = 0; i < numberOfIntervals; i++) {
        // Skip over break time
        if (currentTime >= breakStartTime && currentTime < breakStartTime + breakDuration) {
          currentTime = breakStartTime + breakDuration;
        }
        
        // Allocate 30-minute slot
        allocatedDaySlots.push({
          day,
          time: convertToTime(currentTime),
          patient: null // Initially no patient assigned
        });
        
        // Move to the next 30-minute slot
        currentTime += 30;
      }
      
      // Add allocated slots for the day to the result array
      allocatedSlots.push(...allocatedDaySlots);
    });
    
    return allocatedSlots;
  }
  
  function convertToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  function convertToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
  
  // Example usage:
  const timeSlots = [
    {
      day: 'monday',
      startingTime: '09:00',
      endingTime: '17:00',
      breakStartingTime: '14:00'
    },
    {
      day: 'tuesday',
      startingTime: '09:00',
      endingTime: '17:00',
      breakStartingTime: '14:00'
    }
  ];
  
  const allocatedTimeSlots = allocateTimeSlots(timeSlots, 60); // Assuming 1-hour break
  console.log(allocatedTimeSlots);
  
  return (
    <div>
          
    </div>
  )
}

export default Demo