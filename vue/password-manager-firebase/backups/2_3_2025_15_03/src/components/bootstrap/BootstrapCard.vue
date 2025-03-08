<script setup>
defineProps(['title'])
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h2><u>{{ title }}</u></h2>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>