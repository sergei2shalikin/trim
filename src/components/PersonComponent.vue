<template>
  <div class="list-wrapper">
    <div v-if="!personLoaded" class="spinner">Loading...</div>
    <person-list style="width: 100%" v-if="personMap">
      <person-list-item
        v-for="[eachPerson, eachPersonInfo] of personMap.entries()"
        :key="eachPerson.id"
        :personId="eachPerson.id"
        :pictureId="eachPerson.picId"
        :name="eachPerson.name"
        :surname="eachPerson.surname"
        class="person-item"
        :style="{
          transform: `translateX(${moveOn}px) `,
        }"
      />
    </person-list>
  </div>
</template>

<script setup lang="ts">
import PersonList from '@/components/PersonList.vue';
import PersonListItem from '@/components/PersonListItem.vue';
import fetchAbort from '@/fetchAbort';
import { onMounted, ref } from 'vue';

var personLoaded = ref(false);
var personMap = ref<Map<any, any>>(null);
var moveOn = ref(0);
var lastPosition = ref(0);

onMounted(async () => {
  var customFetch = fetchAbort(fetchPersons);
  personMap.value = await customFetch();
  lastPosition.value = personMap.value.size * 200;
});

function handleArrowRightClick() {
  moveOn.value -= 200;
}
function handleArrowLeftClick() {
  moveOn.value += 200;
}

async function fetchPersons(param: string, signal: AbortSignal) {
  try {
    var url = 'https://cdnapi.smotrim.ru/api/v1/boxes/vesti2';
    var request = await fetch(url, { method: 'GET', signal });
    var data = await request.json();
    var content = data.data.content;
    var persons = new Map();

    for (var eachItem of content) {
      if (eachItem.alias === 'vesti3-persons') {
        for (var person of eachItem.content) {
          if (person.type === 'person') {
            persons.set(person, {});
          }
        }
      }
    }
    return persons;
  } catch (e) {
    console.error(`Error ${e}`)
  } finally {
    personLoaded.value = true;
  }
}
</script>

<style scoped>
.list-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
