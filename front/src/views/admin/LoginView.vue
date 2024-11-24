<script setup lang="ts">
import JButton from '#components/common/JButton.vue';
import JCard from '#components/common/JCard.vue';
import JInput from '#components/common/JInput.vue';
import { computed, ref } from 'vue';
import { useApi } from '#composables/useApi';
import { useRouter } from 'vue-router';
import { ROUTES_NAMES } from '#constants/routes';
import axios from 'axios';
import { useNotify } from '#composables/useNotify';

const loginData = ref({
  email: '',
  password: '',
});

const isPasswordRevealed = ref<boolean>(false);
const isInputValid = ref<boolean>(true);

const router = useRouter();

const handleSubmitForm = async() => {
  if (!loginData.value.email || !loginData.value.password) {
    isInputValid.value = false;
    return;
  }

  const { login } = useApi();
  const response = await login({ email: loginData.value.email, password: loginData.value.password });
  
  if (response.status === axios.HttpStatusCode.Ok) {
    onLoginSuccess();
  } else if (response.status === axios.HttpStatusCode.Unauthorized) {
    onLoginError();
  }
};

const handleClickOnPasswordReveal = () => {
  isPasswordRevealed.value = !isPasswordRevealed.value;
};

const onLoginSuccess = async() => {
  isInputValid.value = true;
  await useNotify('success', 'Bienvenue dans le back-office');
  router.replace({ name: ROUTES_NAMES.ADMIN_DASHBOARD });
};

const onLoginError = async() => {
  loginData.value.email = '';
  loginData.value.password = '';
  await useNotify('error', 'Une erreur est survenue');
  router.replace({ name: ROUTES_NAMES.HOME });
};

const handleResetForm = () => {
  loginData.value.email = '';
  loginData.value.password = '';
  isInputValid.value = true;
};

const getPasswordInputType = computed(() => {
  return isPasswordRevealed.value ? 'text' : 'password';
});

const getPasswordIcon = computed(() => {
  return isPasswordRevealed.value ? 'fad fa-unlock' : 'fad fa-lock';
});
</script>

<template>
  <form @submit.prevent="handleSubmitForm">
    <JCard class="login-form">
      <template #card-content>
        <div class="inputs-container">
          <JInput
            v-model="loginData.email"
            input-type="email"
            class="login-inputs"
            placeholder="john@doe.com"
            :required="!isInputValid && !loginData.email"
          />
          
          <JInput
            v-model="loginData.password"
            :input-type="getPasswordInputType"
            class="login-inputs"
            placeholder="mot de passe"
            :required="!isInputValid && !loginData.password"
          >
            <template #append>
              <FIcon
                @click="handleClickOnPasswordReveal"
                :icon="getPasswordIcon"
              />
            </template>
          </JInput>
        </div>
      </template>

      <template #card-footer>
        <div class="buttons-container">
          <JButton
            class="login-buttons"
            input-type="danger"
            type="reset"
            @click="handleResetForm"
          >
            <template #default>
              <span class="button-content">annuler</span>
            </template>
          </JButton>

          <JButton
            class="login-buttons"
            input-type="success"
            type="submit"
          >
            <template #default>
              <span class="button-content">se connecter</span>
            </template>
          </JButton>
        </div>
      </template>
    </JCard>
  </form>
</template>

<style scoped lang="scss">
.inputs-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 10px;
  gap: 10px;

  .login-inputs {
    flex: 0 1 180px;
  }
}

.buttons-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;

  .login-buttons {
    flex: 0 1 180px;

    .button-content {
      text-transform: uppercase;
    }
  }
}
</style>