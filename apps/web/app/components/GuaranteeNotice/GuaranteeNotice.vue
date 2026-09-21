<template>
  <div v-if="showGuaranteeNotice" class="w-full mt-4">
    <GuaranteeNoticeBanner />
  </div>
</template>

<script setup lang="ts">
const { getBooleanSetting } = useSiteSettings('showGuaranteeNotice');

const showGuaranteeNotice = computed(() => getBooleanSetting(true));
</script>
