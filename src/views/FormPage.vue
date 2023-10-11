<template>
    <div>
        <UForm :formData="formData" />
    </div>
  </template>
  
  <script>
  import UForm from "../components/UForm.vue";
  
  export default {
    components: {
      UForm,
    },
    data() {
      return {
        formData: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          publicProfile: true,
          position: {
            frontendDeveloper: "Frontend Developer",
            backendDeveloper: "Backend Developer",
          },
        },
      };
    },
  };
  </script>
  