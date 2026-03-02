<template>
    <v-row>
        <v-col cols="12" class="text-center mb-12">
            <h1
                class="text-h3 text-sm-h2 font-weight-bold mb-4"
                :class="dark ? 'text-white' : 'text-gradient'"
            >
                {{ title }}
            </h1>
            <v-divider
                class="mx-auto"
                :class="{ 'bg-accent': dark }"
                :color="dark ? undefined : 'accent'"
                style="max-width: 100px"
                :thickness="4"
            ></v-divider>
            <p
                v-if="subtitle"
                class="text-h6 mt-6"
                :class="dark ? 'text-white' : 'text-medium-emphasis'"
                :style="dark ? 'opacity: 0.9' : ''"
            >
                {{ subtitle }}
            </p>
        </v-col>
    </v-row>
</template>

<script setup>
defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    dark: { type: Boolean, default: false },
})
</script>
