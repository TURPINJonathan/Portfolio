<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BubbleIcon from '#components/common/BubbleIcon.vue';
import { ROUTES } from '#constants/routes';

const router = useRouter();
const userLocale = navigator.language;

const dateFormat = ref('MMMM YYYY');
const currentDate = useDateFormat(useNow(), dateFormat.value, { locales: userLocale });

const handleClickOnSocialIcon = (url: string | null, type: string | null = null): void => {
  if (url) {
    window.open(url, '_blank');
  } 
  if (type) {
    router.push({ name: type });
  }
};
</script>

<template>
  <footer id="footer">
    <div class="left-container">
      <span>
        <FIcon icon="fat fa-copyright" /> Copyright - {{ currentDate }}
      </span>
    </div>

    <div class="middle-container">
      <span class="title">turpin jonathan</span>
      <span class="job">développeur Web</span>
    </div>

    <div class="right-container">
      <BubbleIcon
        backgroundColor="rgb(206 177 15)"
        icon="fa fa-at"
        @click-on-bubble-icon="handleClickOnSocialIcon(null, ROUTES.CONTACT)"
      />
      
      <BubbleIcon
        backgroundColor="#333"
        icon="fab fa-github"
        @click-on-bubble-icon="handleClickOnSocialIcon('https://github.com/TURPINJonathan')"
      />
      
      <BubbleIcon
        backgroundColor="#0077b5"
        icon="fab fa-linkedin-in"
        @click-on-bubble-icon="handleClickOnSocialIcon('https://www.linkedin.com/in/turpin-jonathan')"
      />
    </div>
  </footer>
</template>

<style scoped lang="scss">
#footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  div {
    display: flex;
    align-items: center;
  }

  .left-container {
    font-size: 0.7rem;
    justify-content: center;
    gap: 0.5rem;

    span {
      text-transform: capitalize;
    }
  }

  .middle-container {
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;

    .title {
      font-size: 0.7rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    .job {
      font-size: 0.7rem;
      text-transform: capitalize;
    }
  }

  .right-container {
    justify-content: flex-end;
    gap: 0.5rem;
    font-size: 1rem;
  }
}

@media (width <= 500px) {
  #footer {
    flex-direction: column;
    gap: 1rem;

    div {
      align-items: center;
    }

    .middle-container {
      order: -1;
    }
  }
}
</style>