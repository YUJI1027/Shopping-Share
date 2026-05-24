<template>
  <div class="calendar-view">
    <Header />
    <div class="calendar-container">
      <TopBar />
      <div class="calendar">
        <div class="calendar-header">
          <button @click="prevMonth">◀︎</button>
          <h2>{{ monthYear }}</h2>
          <button @click="nextMonth">▶︎</button>
        </div>
        <div class="calendar-grid">
          <div class="day" v-for="day in days" :key="day.date">
            <div class="date">{{ day.date }}</div>
            <div class="events">
              <EventCard
                v-for="event in day.events"
                :key="event.id"
                :event="event"
              />
            </div>
          </div>
        </div>
      </div>
      <AddEventModal v-if="showAddEventModal" @close="showAddEventModal = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import TopBar from '@/components/TopBar.vue';
import EventCard from '@/components/EventCard.vue';
import AddEventModal from '@/components/AddEventModal.vue';

export default defineComponent({
  components: {
    Header,
    TopBar,
    EventCard,
    AddEventModal,
  },
  setup() {
    const showAddEventModal = ref(false);
    const currentDate = ref(new Date());
    
    const monthYear = computed(() => {
      return currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' });
    });

    const days = computed(() => {
      // Logic to generate days of the month with events
      return [];
    });

    const prevMonth = () => {
      currentDate.value.setMonth(currentDate.value.getMonth() - 1);
    };

    const nextMonth = () => {
      currentDate.value.setMonth(currentDate.value.getMonth() + 1);
    };

    return {
      showAddEventModal,
      monthYear,
      days,
      prevMonth,
      nextMonth,
    };
  },
});
</script>

<style scoped>
.calendar-view {
  padding: 20px;
  background-color: #f0f4ff; /* Light blue background */
}

.calendar-container {
  display: flex;
  flex-direction: column;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.day {
  border: 1px solid #007bff; /* Blue border */
  border-radius: 5px;
  padding: 10px;
  background-color: #ffffff; /* White background for each day */
}

.date {
  font-weight: bold;
  text-align: center;
}

.events {
  margin-top: 10px;
}
</style>