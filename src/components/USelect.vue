<template>
  <div class="aselect" :data-value="value" :data-list="data">
    <div class="selector" @click="toggle()">
      <div class="label">
        <span>{{ value }}</span>
      </div>
      <div class="arrow" :class="{ expanded: visible }"></div>
      <div :class="{ hidden: !visible, visible }">
        <ul>
          <li
            :class="{ current: item === value }"
            v-for="item in data"
            :key="item"
            @click="select(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    formData: Object,
  },
  data() {
    return {
      visible: false,
      value: "Должность",
    };
  },

  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    select(option) {
      this.value = option;
      this.visible = true;
      this.$emit("formData", this.value);
    },
  },
};
</script>

<style lang="scss">
.aselect {
  width: 100%;
  cursor: pointer;
  .selector {
    position: relative;
    z-index: 1;
    .arrow {
      position: absolute;
      right: 10px;
      top: 40%;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 10px solid #888;
      transform: rotateZ(0deg) translateY(0px);
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
    }
    .expanded {
      transform: rotateZ(180deg) translateY(2px);
    }
    .label {
      display: block;
      padding: 10px;
      font-size: 16px;
      color: #888;
      border-radius: 11px;
      border: 1px solid #e6e6eb;
    }
  }
  ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
    border-radius: 11px;
    border: 1px solid var(--grayscale-300, #e6e6eb);
    position: absolute;
    z-index: 1;
    background: #fff;
  }
  li {
    padding: 12px;
    color: #9292a0;
    cursor: pointer;
    &:hover {
      color: white;
      background: #9292a0;
      border-radius: 5px;
    }
  }
  .current {
    background: #eaeaea;
  }
  .hidden {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }
}
</style>
