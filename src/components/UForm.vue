<template>
  <div>
  
    <h3 class="title-form">Регистрация</h3>
    <form class="form" @submit.prevent="submit">
      <div class="form-boxSwitch">
        <div class="form-boxSwitch-switchTitle">
          <label class="switch">
            <input type="checkbox" v-model="checkedSwitch" />
            <span class="slider round"></span>
          </label>
          <p>Публичный профиль</p>
        </div>
        <span
          >Включает профиль для просмотра другими пользователями по ссылке</span
        >
      </div>

      <p class="form-titleData">Данные</p>
      <div class="form-flexBox">
        <div class="form-flexBox-input form-flexBox-style">
          <UInput
            id="name"
            type="name"
            name="name"
            nameInput="Имя"
            placeholder="Имя"
            :formData="formData"
            v-model="formData.name"
          />
          <UInput
            id="email"
            type="email"
            name="email"
            nameInput="Email"
            placeholder="Email"
            :formData="formData"
            v-model="formData.email"
          />
          <UInput
            id="password"
            type="password"
            name="password"
            nameInput="password"
            placeholder="Пароль"
            :formData="formData"
            v-model="formData.password"
          />
        </div>
        <div class="form-flexBox-select">
          <USelect
            v-model="formData.position"
            :data="positionOptions"
            @formData="handleFormData"
          />
          <UInput
            id="password"
            type="password"
            name="confirmPassword"
            nameInput="confirmPassword"
            placeholder="Повторите пароль"
            :formData="formData"
            v-model="formData.confirmPassword"
          />
        </div>
      </div>
      <div class="form-checkbox">
        <label
          for="checkbox"
          class="container"
          :class="[isErrorCheckbox ? 'text-error' : 'text-checkbox']"
        >
          Нажимая на кнопку “Регистрация”, я подтверждаю свое согласие с
          политикой
          <br />
          конфиденциальности и обработки персональных данных
          <input type="checkbox" id="checkbox" v-model="checked" />
          <span class="checkmark"></span>
        </label>
      </div>

      <div class="form-box">
        <button class="form-box-btn" type="submit">Регистрация</button>
      </div>
    </form>
  </div>
</template>

<script>
import UInput from "./UInput.vue";
import USelect from "./USelect.vue";

export default {
  components: {
    UInput,
    USelect,
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        publicProfile: true,
        position: "",
      },
      positionOptions: ["Frontend Developer", "Backend Developer"],
      publicProfile: true,
      checkedSwitch: true,
      checked: true,
    };
  },
  methods: {
    handleFormData(value) {
      this.formData.position = value;
    },
    submit() {
      const url = "https://lmstestapi.reezonly.com/v1/user/signup";
      if (this.fromValidation) {
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            errors: null,
            name: this.formData.name,
            email: this.formData.email,
            password: this.formData.password,
            confirmPassword: this.formData.confirmPassword,
            position: this.formData.position,
          }),
        })
          .then((response) => {
            if (response.ok) {
              this.$router.push({ name: "home" });
            } else {
              //тут описание ошибки в network или вынесли логику в отдельную функцию.
              return response.json().then((responseData) => {
                this.formData.errors = responseData.errors;
                console.log(`Error message: ${response.statusText}`);
              });
            }
          })
          .catch((error) => {
            console.log(`Network error: ${error.message}`);
          });
      }
    },
  },
  computed: {
    fromValidation() {
      return (
        this.checked &&
        this.formData.position !== "" &&
        this.formData.password === this.formData.confirmPassword
      );
    },
    isErrorCheckbox() {
      return this.checked ? false : true;
    },
  },
};
</script>

<style lang="scss">
.title-form {
  border-radius: 15px 15px 0px 0px;
  background: #fdfdfd;
  padding: 27px 20px;
  border-bottom: 1px solid #e6e6eb;

  color: #000;
  font-family: Montserrat;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: 27px;
}
.form {
  border-radius: 0px 0px 15px 15px;
  background: #fdfdfd;
  padding: 27px 34px 42px 20px;
  @media (max-width: 400px) {
    padding: 10px;
  }
  &-boxSwitch {
    border-bottom: 1px solid #e6e6eb;
    padding-bottom: 30px;
    margin-bottom: 20px;
    &-switchTitle {
      display: flex;
      label {
        display: block;
        margin-right: 20px;
      }
      p {
        color: #000;
        font-family: Montserrat;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 19px;
        margin-bottom: 10px;
      }
    }
    span {
      display: block;
      color: #696977;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 19px;
    }
  }
  &-titleData {
    margin-bottom: 24px;
    color: #000;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 19px;
  }
  &-flexBox {
    display: flex;

    @media (max-width: 400px) {
      flex-direction: column;
    }
    &-select {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50%;
      @media (max-width: 400px) {
        flex-direction: column-reverse;
        width: 100%;
        input {
          margin-bottom: 10px;
        }
      }
    }
    &-input {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50%;
      min-height: 197px;
      @media (max-width: 400px) {
        justify-content: flex-start;
        min-height: 0;
        width: 100%;
        input {
          margin-bottom: 10px;
        }
      }
    }
    &-style {
      margin-right: 10px;
      @media (max-width: 400px) {
        margin-right: 0;
      }
    }
  }

  h3 {
    color: #000;
    font-size: 19px;
    font-style: normal;
    font-weight: 700;
    line-height: 27px;
    margin-bottom: 27px;
  }
  &-input_style {
    outline: none;
    border-radius: 11px;
    border: 1px solid #e6e6eb;
    width: 100%;
    padding: 12px 0 12px 10px;
    color: #9292a0;
  }
  &-box {
    display: flex;
    justify-content: center;
  }
  &-box-btn {
    border-radius: 9px;
    border: 1px solid #07a86e;
    width: 100%;
    max-width: 234px;
    padding: 10px 12px;
    background: transparent;
    cursor: pointer;

    color: #07a86e;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
    transition: all 0.3s ease-in;
    &:hover {
      background: #07a86e;
      color: #fff;
    }
  }
  &-checkbox {
    display: flex;
    align-items: flex-start;
    margin-top: 30px;
    padding: 25px 0px 42px 0px;
    width: 100%;
    border-top: 1px solid #e6e6eb;

    input {
      display: block;
      margin-right: 15px;
    }
    p {
      color: #000;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 19px;
    }
  }
}
</style>
