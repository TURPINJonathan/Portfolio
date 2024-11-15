<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core';
import { ref } from 'vue';

const userLocale = navigator.language;

const dateFormat = ref('MMMM YYYY');
const currentDate = useDateFormat(useNow(), dateFormat.value, { locales: userLocale });
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
      <div class="contact-item email">
        <FIcon icon="fa fa-at" />
      </div>
      <a
        class="contact-item github"
        href="https://github.com/TURPINJonathan"
        target="_blank"
      >
        <FIcon icon="fab fa-github" />
      </a>
      <a
        class="contact-item linkedin"
        href="https://www.linkedin.com/in/turpin-jonathan"
        target="_blank"
      >
        <FIcon icon="fab fa-linkedin-in" />
      </a>
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

    .contact-item {
      padding: 0.5rem;
      border-radius: 50%;
      width: 1rem;
      height: 1rem;

      &:hover {
        color: var(--color-light);
        cursor: pointer;
      }
    }

    .email {
      border: 1px solid var(--color-email);

      &:hover {
        background-color: var(--color-email);
      }
    }

    .github {
      border: 1px solid var(--color-github);

      &:hover {
        background-color: var(--color-github);
      }
    }

    .linkedin {
      border: 1px solid var(--color-linkedin);

      &:hover {
        background-color: var(--color-linkedin);
      }
    }
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