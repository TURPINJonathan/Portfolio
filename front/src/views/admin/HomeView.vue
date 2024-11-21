<script setup lang="ts">
import JCard from '#components/common/JCard.vue';

// import { useApi } from '#composables/useApi';


const handleClick = async() => {
  // const { login } = useApi();
  // const response = await login({ email: 'admin@admin.fr', password: '1505Admin+' });

};
</script>

<template>
  <JCard>
    <button @click="handleClick">CLICK ME</button>
  </JCard>
</template>
