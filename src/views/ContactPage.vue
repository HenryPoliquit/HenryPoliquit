<template>
    <v-main>
        <v-container class="section-spacing">
            <SectionHeader title="Let's build something" label="04 — CONTACT" subtitle="Have a project in mind? I'd love to hear about it." />
            <v-row>
                <v-col cols="12" md="7">
                    <ContactForm />
                </v-col>
                <v-col cols="12" md="5">
                    <ContactInfo />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup>
import SectionHeader from '../components/common/SectionHeader.vue'
import ContactForm from '../components/contact/ContactForm.vue'
import ContactInfo from '../components/contact/ContactInfo.vue'
</script>
