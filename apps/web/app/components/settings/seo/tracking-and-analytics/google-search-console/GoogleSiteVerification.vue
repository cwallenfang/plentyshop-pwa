<template>
  <div class="py-2">
    <div class="flex justify-between mb-2">
      <UiFormLabel>{{ getEditorTranslation('label') }}</UiFormLabel>
    </div>
    <label>
      <SfInput
        v-model="googleSiteVerification"
        type="text"
        data-testid="google-analytics-tracking-id"
        :placeholder="getEditorTranslation('placeholder')"
      />
    </label>
  </div>
</template>
<script setup lang="ts">
import { SfInput } from '@storefront-ui/vue';

const { updateSetting, getSetting } = useSiteSettings('googleSiteVerification');

const googleSiteVerification = computed({
  get: () => getSetting(),
  set: (value) => updateSetting(value),
});
</script>

<i18n lang="json">
{
  "en": {
    "label": "Google Search Console Site Verification ID",
    "placeholder": "Google Search Console Site Verification ID"
  },
  "de": {
    "label": "Google Search Console Site Verification ID",
    "placeholder": "Google Search Console Site Verification ID"
  }
}
</i18n>
