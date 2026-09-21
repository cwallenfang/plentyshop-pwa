<template>
  <div class="text-sm mx-4 @md:pb-0">
    <div class="flex items-center">
      <label for="terms-checkbox" class="select-none">
        <i18n-t keypath="checkout.termsInfoInstant" scope="global">
          <template #terms>
            <UiLink
              :href="localePath(paths.termsAndConditions)"
              target="_blank"
              class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
            >
              {{ t('termsAndConditions') }}
            </UiLink>
          </template>

          <template #cancellationRights>
            <UiLink
              :href="localePath(paths.cancellationRights)"
              target="_blank"
              class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
            >
              {{ t('cancellationRights') }}
            </UiLink>
          </template>

          <template #privacyPolicy>
            <UiLink
              :href="localePath(paths.privacyPolicy)"
              target="_blank"
              class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
            >
              {{ t('privacyPolicy') }}
            </UiLink>
          </template>
        </i18n-t>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { paths } from '~/utils/paths';

const localePath = useLocalizedPath();
const { t } = useI18n();
</script>
