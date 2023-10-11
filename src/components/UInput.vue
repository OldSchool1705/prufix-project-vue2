<template>
  <div>
    <input
      class="form-input_style"
      :id="id"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="localValue"
      @input="updateValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    nameInput: String,
    id: String,
    type: String,
    name: String,
    placeholder: String,
    formData: Object,
  },
  data() {
    return {
      localValue: this.formData[this.name], 
    };
  },
  methods: {
    updateValue(event) {
      this.localValue = event.target.value;
      this.$emit("input", this.localValue);
    },
  },
};
</script>
