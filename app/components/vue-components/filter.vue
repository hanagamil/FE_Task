<template>
    <div class="c-filter__wrapper">
        <input class="c-input" v-model="value" />
        <button class="c-button" v-on:click="clear">Clear</button>
    </div>
</template>
<script>
export default {
  name: "FilterComponent",
  data() {
      return {
          value: '' 
      };
  },
  watch: {
      value(newValue) {
          this.$emit('change', newValue);
      }
  },
  mounted() {
      const filterVal = new URL(window.location.href).searchParams.get('filter');
      this.value = filterVal ? filterVal : '';
  },
  methods: {
    clear: function () {
        this.value = '';
    }
  }
};
</script>