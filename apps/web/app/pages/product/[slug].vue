<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <EditablePage v-if="config.enableProductEditing" :identifier="'0'" :type="'product'" prevent-blocks-request />

    <NarrowContainer v-else>
      <div class="md:grid gap-x-6 grid-areas-product-page grid-cols-product-page relative">
        <section class="grid-in-left-top md:h-full xl:max-h-[700px] relative">
          <ProductEprel :product="product" :size="'xxl'" />
          <Gallery :images="addModernImageExtensionForGallery(productGetters.getGallery(product))" :index="0" />
        </section>
        <section class="mb-10 grid-in-right md:mb-0">
          <UiPurchaseCard v-if="product" :product="product" :review-average="countsProductReviews" />
        </section>
        <section class="grid-in-left-bottom md:mt-8">
          <UiDivider class="mt-4 mb-2 md:mt-8" />
          <NuxtLazyHydrate when-visible>
            <ProductAccordion v-if="product" :product="product" />
          </NuxtLazyHydrate>
          <ReviewsAccordion
            v-if="product"
            :product="product"
            :total-reviews="reviewGetters.getTotalReviews(countsProductReviews)"
          />
          <div class="p-4 mb-6">
            <UiLazyContentDrawer :categoryid="725" :title="'Zahlungsinformationen'" />
          </div>
          <div class="p-4 flex">
            <p class="font-bold leading-6 cursor-pointer" data-testid="open-manufacturer-drawer" @click="openDrawer()">
              <span>{{ t('legalDetails') }}</span>
              <SfIconChevronRight />
            </p>
          </div>
        </section>
      </div>

      <section ref="recommendedSection" class="mx-4 mt-8 mb-8 hidden">
        <component
          :is="RecommendedProductsAsync"
          v-if="showRecommended"
          :category-id="productGetters.getCategoryIds(product)[0] ?? ''"
        />
      </section>
      <section ref="crossellingProductsSimilar" class="mx-4 mt-8 mb-8">
        <component
          :is="CrossellingProductsAsync"
          v-if="showCrosssellingSimilar"
          :cross-selling-relation="'Similar'"
          :product="product"
          :show-title="true"
        />
      </section>
      <section ref="crossellingProductsAccessory" class="mx-4 mt-8 mb-8">
        <component
          :is="CrossellingProductsAsync"
          v-if="showCrosssellingAccessory"
          :cross-selling-relation="'Accessory'"
          :product="product"
          :show-title="true"
        />
      </section>
      <section ref="crossellingProductsAccessory" class="mx-4 mt-8 mb-8">
        <component
          :is="CrossellingProductsAsync"
          v-if="showCrosssellingAccessory"
          :cross-selling-relation="'Bundle'"
          :product="product"
          :show-title="true"
        />
      </section>
      <section ref="crossellingProductsAccessory" class="mx-4 mt-8 mb-8">
        <component
          :is="CrossellingProductsAsync"
          v-if="showCrosssellingAccessory"
          :cross-selling-relation="'ReplacementPart'"
          :product="product"
          :show-title="true"
        />
      </section>
    </NarrowContainer>

    <UiReviewModal />
    <ProductLegalDetailsDrawer v-if="open" :product="product" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Product } from '@plentymarkets/shop-api';
import type { WatchStopHandle } from 'vue';
import { productGetters } from '@plentymarkets/shop-api';
import type { Locale } from '#i18n';

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});

const route = useRoute();
const { setCurrentProduct } = useProducts();
const { setBlocksListContext } = useBlocksList();
const { setProductMetaData, setProductRobotsMetaData, setProductCanonicalMetaData } = useStructuredData();
const { buildProductLanguagePath } = useLocalization();
const { productParams, productId } = createProductParams(route.params);
const { productForEditor, fetchProduct, setProductMeta, setBreadcrumbs, breadcrumbs } = useProduct(productId);
const product = productForEditor;
const { disableActions } = useEditor();
const { fetchProductReviews, fetchProductAuthenticatedReviews } = useProductReviews(Number(productId));
const { open } = useProductLegalDetailsDrawer();
const { setPageMeta } = usePageMeta();
const { resetNotification } = useEditModeNotification(disableActions);
const { isAuthorized } = useCustomer();
const { variationId } = useProductAttributes();
let variationWatchHandler: WatchStopHandle | undefined;

definePageMeta({
  layout: false,
  path: '/:slug*:sep(/a-|_):itemId',
  validate: async (route) => {
    return validateProductParams(route.params);
  },
  type: 'product',
  isBlockified: true,
  identifier: 0,
});

const CrossellingProductsAsync = defineAsyncComponent(
  async () => await import('~/components/ProductCrossselling/ProductCrossselling.vue'),
);

const showRecommended = ref(false);
const recommendedSection = ref<HTMLElement | null>(null);

const showCrosssellingSimilar = ref(false);
const crossellingProductsSimilar = ref<HTMLElement | null>(null);

const showCrosssellingAccessory = ref(false);
const crossellingProductsAccessory = ref<HTMLElement | null>(null);

const productName = computed(() => productGetters.getName(product.value));
const icon = 'sell';
setPageMeta(productName.value, icon);

await fetchProduct(productParams).then(() => {
  usePlentyEvent().emit('frontend:productLoaded', {
    product: product.value,
  });
});

if (Object.keys(product.value).length === 0) {
  if (import.meta.client) showError({ statusCode: 404, statusMessage: 'Product not found' });

  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  });
}

setCurrentProduct(productForEditor.value || ({} as Product));
setProductMeta();
setBlocksListContext('product');
setBreadcrumbs();

async function fetchReviews() {
  const productVariationId = productGetters.getVariationId(product.value);
  await fetchProductReviews(Number(productId), productVariationId);
  if (isAuthorized.value) {
    await fetchProductAuthenticatedReviews(Number(productId), productVariationId);
  }
}
await fetchReviews();

watch(
  disableActions,
  () => {
    setCurrentProduct(productForEditor.value || ({} as Product));
  },
  { immediate: true },
);

/* TODO: This should only be temporary.
 *  It changes the url of the product page while on the page and switching the locale.
 *  Should be removed when the item search is refactored.
 */
watch(
  () => product.value.texts.urlPath,
  (value, oldValue) => {
    if (value !== oldValue) {
      navigateTo({
        path: buildProductLanguagePath(
          `/${productGetters.getUrlPath(product.value)}_${productGetters.getItemId(product.value)}`,
        ),
        query: route.query,
        replace: true,
      });
    }
  },
);

watch(
  () => product.value,
  () => {
    setProductCanonicalMetaData(product.value);
    setProductMetaData(product.value);
    setProductRobotsMetaData(product.value);
  },
  { immediate: true },
);

watch(
  () => route.params,
  () => {
    const productName = computed(() => productGetters.getName(product.value));
    const icon = 'sell';
    setPageMeta(productName.value, icon);
  },
  { immediate: true },
);

const observeRecommendedSection = () => {
  if (import.meta.client && recommendedSection.value) {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          showRecommended.value = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 250px 0px',
      },
    );
    observer.observe(recommendedSection.value);
  }
};
const observeCrossellingSectionSimilar = () => {
  if (import.meta.client && crossellingProductsSimilar.value) {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          showCrosssellingSimilar.value = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 250px 0px',
      },
    );
    observer.observe(crossellingProductsSimilar.value);
  }
};

const observeCrossellingSectionAccessory = () => {
  if (import.meta.client && crossellingProductsAccessory.value) {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          showCrosssellingAccessory.value = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 250px 0px',
      },
    );
    observer.observe(crossellingProductsAccessory.value);
  }
};

onBeforeRouteLeave(() => {
  resetNotification();
  if (variationWatchHandler) {
    variationWatchHandler();
  }
});

onNuxtReady(() => {
  observeRecommendedSection();
  observeCrossellingSectionSimilar();
  observeCrossellingSectionAccessory();
  if (import.meta.client && useCallisto().isEnabled) {
    variationWatchHandler = watch(variationId, async () => {
      if (Number(productParams.variationId) !== variationId.value && variationId.value > 0) {
        productParams.variationId = variationId.value;
        await fetchProduct(productParams);
        setCurrentProduct(productForEditor.value || ({} as Product));
      }
    });
  }
});
</script>
