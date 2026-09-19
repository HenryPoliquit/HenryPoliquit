<template>
    <v-main class="contact-page">
        <v-container class="page-top">
            <SectionHeader
                tag="h1"
                title="Contact"
                label="Correspondence"
                subtitle="Work, questions, or a bug on one of my sites — all welcome."
            />
        </v-container>

        <section class="band band--open">
            <v-container>
                <div class="contact-grid">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </v-container>
        </section>
    </v-main>
</template>

<script setup>
import SectionHeader from '../components/common/SectionHeader.vue'
import ContactForm from '../components/contact/ContactForm.vue'
import ContactInfo from '../components/contact/ContactInfo.vue'
</script>

<style scoped>
.contact-page {
    background: rgb(var(--v-theme-background));
    min-height: calc(100vh - 64px);
}

.page-top {
    padding-top: clamp(40px, 8vh, 80px);
    padding-bottom: var(--band-y);
}

.contact-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: 56px;
    align-items: start;
}

@media (max-width: 860px) {
    .contact-grid {
        grid-template-columns: minmax(0, 1fr);
        gap: 48px;
    }
}
</style>
