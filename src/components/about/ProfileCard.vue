<template>
    <v-row class="mb-12">
        <v-col cols="12">
            <v-card class="fade-in" elevation="4">
                <v-card-text class="pa-4 pa-sm-8 text-center">
                    <v-avatar size="96" class="mb-4">
                        <v-img :src="store.personal.avatarUrl" alt="Profile"></v-img>
                    </v-avatar>
                    <h2 class="text-h5 text-sm-h4 font-weight-bold mb-4">{{ store.personal.name }}</h2>
                    <p class="text-body-1 text-sm-h6 text-accent mb-4">{{ store.personal.title }}</p>
                    <p class="text-body-1 mx-auto" style="max-width: 800px;">{{ store.personal.bio }}</p>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()
</script>
